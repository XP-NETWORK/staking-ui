import { useEffect } from 'react'
import "./nft.css"
import { getStakeById } from "../../utils/stake"
import { useSelector, useDispatch } from 'react-redux'
import { updateIndex, updateNftTokenIndex } from "../../redux/stakeSlice"
import {  goBack } from "../../redux/counterSlice"
import { useMoralis } from "react-moralis";

export default function NFT({ tokenID, i }) {
    const dispatch = useDispatch()
    const withdrawed = useSelector(state => state.stakeData.withdrawed)
    const nftTokenId = useSelector(state => state.stakeData.nftTokenId)
    const currentToken = useSelector(state => state.stakeData.nftTokenIndex)
    const img = useSelector(state => state.stakeData.image).filter(n => n.token === tokenID)[0]
    const connectionToggler = useSelector(state => state.data.toggleConnection)
    const { Moralis } = useMoralis();

    const onClickHandler = () => {
        getStakeById(tokenID, i, Moralis, connectionToggler)
        dispatch(updateIndex(i))
        dispatch(updateNftTokenIndex(i))
        dispatch(goBack(currentToken - i))
    }


    let currImg
    if(img){
        // debugger
        currImg = img.url
    }


    if(withdrawed === true){
        return (
            <div className='token--disabled'>
                <img src={currImg} alt="" />
            </div>
        )
    }
    else{
        return (
            <div onClick={() => onClickHandler()} className={tokenID === nftTokenId ? 'token--active':'token'}>
                <img src={currImg} alt="" />
            </div>
        )
    }
}
