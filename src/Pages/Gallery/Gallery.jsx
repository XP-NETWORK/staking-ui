import React, { useEffect, useState, useRef } from 'react'
import "./Gallery.css"
import  magnifier  from "../../assets/magnifier.svg"
import NFTBox from './NFTBox'
import { useSelector } from 'react-redux'
import { totalSupply, stakesGallery } from "../../utils/stake"
import { useLocation } from 'react-router'
import { useParams  } from "react-router-dom"


export default function Gallery() {
    const [index, setIndex] = useState(0)
    const [goingUp, setGoingUp] = useState(false);
    const ref = useRef(0)
    const collection = useSelector(state => state.totalSupply.collection)
    console.log(collection);

    // const [endLoad, setEndLoad] = useState(18)
    const [search, setSearch] = useState('')
    const [filterFlag, setFilterFlag] = useState(false)



    const onScroll = (e) => {
        const currentScrollY = e.target.scrollTop;
        var element = e.target;
    
        if (ref.current < currentScrollY && goingUp) {
          setGoingUp(false);
        }
        if (element.scrollHeight - element.scrollTop < element.clientHeight + 10 ) {
          setGoingUp(true);
        //   setEndLoad(prev => prev+12)
          totalSupply(index, 20)
          setIndex(index + 20)
        }
        ref.current = currentScrollY;
      };
    
    useEffect(() => {
     
            totalSupply(index, 80)
            setIndex(80)
       
    }, [])

    // useEffect(() => {

    //     if(search === ''){
    //         totalSupply(index, 80)
    //         setIndex(80)
    //     }
    // }, [search])

    // useEffect(() => {
    //     if(filterFlag){
    //         stakesGallery(+search)
    //     }
    //     }, [filterFlag])

    const searchHandler = item => {
        if(search === ""){
            totalSupply(index, 80)
            setIndex(80)
        }
        const reg = new RegExp('^[0-9]+$');
        const num = Number(item.target.value)
        if(reg.test(num)){
            setSearch(item.target.value)
        }
    }

    const keyPresHandler = (item) => {
        if(search === "" && item.key === "Enter"){
            if(collection.length <= 1){
                totalSupply(index, 80)
                setIndex(80)
                setFilterFlag(false)
            }
        }
        if(item.key === "Enter"){
            setFilterFlag(true)
        }
    }

    const onBlurHandler = item => {
        if(search === ""){
            console.log("Empty search");
        }
        if(item.target.value === ''){
            setFilterFlag(false)
        }
    }

    

    const showGallery = () => {

        if(!collection.length || !collection){
            return <div className="search__loader"></div>
        }
        else if(!collection[+search] || (Array.isArray(collection) && collection[+search].staker === "0x0000000000000000000000000000000000000000")){
            return <div className="not-exist"><span>NFT does not exist</span></div>
        }
        else if(filterFlag && search !== "" && Array.isArray(collection)){
            return collection.filter(item => item.token === Number(search)).map(item => { return (
                <NFTBox url={item.url} key={item.token} tokenID={item.token} staker={ item.staker}/>
            )})
        }
        else if(collection.length > 0){ 
            const newCollection = collection
            return newCollection.map( (item, index) => {
                return <NFTBox url={item.url} key={index} tokenID={item.token} staker={item.staker}/>
            })
        }
       
    }

    return (
        <div className="gallery__wrapper" >
            <div className="gallery__header">NFT Collection</div>
            <div className="gallery__subtitle">XPNET Users Gallery</div>
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
