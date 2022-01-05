import React, { useEffect, useState, useRef } from 'react'
import "./Gallery.css"
import  magnifier  from "../../assets/magnifier.svg"
import NFTBox from './NFTBox'
import { useSelector } from 'react-redux'
import { totalSupply, stakesGallery } from "../../utils/stake"
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { setChainModalIsOpen } from "../../redux/counterSlice"
import NoItems from './NoItems'
import { setNFTNotExist } from '../../redux/stakeSlice'

export default function Gallery() {
    const [index, setIndex] = useState(0)
    const [goingUp, setGoingUp] = useState(false);
    const ref = useRef(0)
    const collection = useSelector(state => state.totalSupply.collection)
    const account = useSelector(state => state.data.account)
    const {library, chainId} = useWeb3React()
    const [search, setSearch] = useState('')
    const [filterFlag, setFilterFlag] = useState(false)
    const dispatch = useDispatch()
    const [wrongNetwork, setWrongNetwork] = useState(true)
    const nftNotExist = useSelector(state => state.stakeData.nftNotExist)
    const [toggler, setToggler] = useState(false)

    const onScroll = (e) => {
        const currentScrollY = e.target.scrollTop;
        var element = e.target;
        if (ref.current < currentScrollY && goingUp) {
          setGoingUp(false);
        }
        if (element.scrollHeight - element.scrollTop < element.clientHeight + 10 ) {
          setGoingUp(true);
          totalSupply(index, 20, library)
          setIndex(index + 20)
        }
        ref.current = currentScrollY;
      };

    function searchHandler(item){
        const reg = new RegExp('^[0-9]+$');
        const num = Number(item.target.value)
        if(reg.test(num)){
            setSearch(item.target.value)
            stakesGallery(num,library)
        }
    }
    const keyPresHandler = (item) => {
        if(item.key === "Enter"){
            stakesGallery(search,library)
        }
    }
    const onBlurHandler = item => {
        // debugger
        if(search === ""){
            totalSupply(index, 20, library)
            setIndex(index + 20)
        }
        if(item.target.value === ''){
            setFilterFlag(false)
        }
    }
    const showGallery = () => {
      
        if(nftNotExist){
            return <NoItems onBackToItems={onBackToItems} />
        }
        else{
            if(collection.length > 0){ 
                const newCollection = collection
                return newCollection.map( (item, index) => {
                    return <NFTBox url={item.url} key={index} tokenID={item.token} staker={item.staker}/>
                })
            }
            else if(!Array.isArray(collection)) return <NFTBox url={collection[0].url} key={search} tokenID={collection[0].token} staker={collection[0].staker}/>
        }
    }

    const onBackToItems = () => {
        // debugger
        setSearch("")
        // setToggler(prev => prev = !prev)
        totalSupply(index, 80, library)
        setIndex(80)
        dispatch(setNFTNotExist(false))
    }

    useEffect(() => {
        totalSupply(index, 80, library)
        setIndex(80)
    }, [])

    useEffect(() => {
        // debugger
        totalSupply(index, 80, library)
        setIndex(80)
    }, [toggler])

    useEffect(() => {
        totalSupply(index, 80, library)
        setIndex(80)
    }, [chainId])

    return (
        <div className="gallery__wrapper" >
            <div className="gallery__header">NFT Collection</div>
            <div className="gallery__subtitle">Explore XPNET Stake Holders Gallery</div>
                <div className="gallery__search">
                    <input onBlur={item => onBlurHandler(item)} onKeyPress={item => keyPresHandler(item)} onChange={ item => searchHandler(item)} value={search} placeholder="Search" type="search" name="nft-search" id="nft-search" className="nft-search" />
                    <div className="nft-search__items"><img src={magnifier} alt="" /></div>
                </div>
            <div className="gallery__container" onScroll={onScroll}>
                { showGallery() }
            </div>
        </div>
    )
}
