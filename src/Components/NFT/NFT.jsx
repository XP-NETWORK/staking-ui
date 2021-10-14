import React from 'react'
import "./nft.css"
import { getStakeById } from "../../utils/stake"
import { useSelector, useDispatch } from 'react-redux'
import { updateIndex, updateNftTokenIndex } from "../../redux/stakeSlice"
import {  goForth, goBack } from "../../redux/counterSlice"

export default function NFT({ tokenID, i }) {
    const dispatch = useDispatch()
    const withdrawed = useSelector(state => state.stakeData.withdrawed)
    const nftTokenId = useSelector(state => state.stakeData.nftTokenId)
    const tokens = useSelector(state => state.data.tokenIDs)
    const currentToken = useSelector(state => state.stakeData.nftTokenIndex)
    console.log("currentToken: ", currentToken)
    // const picPositionX = useSelector(state => state.data.picPositionX)


    const onClickHandler = () => {
        console.log(i, currentToken)
        getStakeById(tokenID, i)
        dispatch(updateIndex(i))
        dispatch(updateNftTokenIndex(i))
        dispatch(goBack(currentToken - i))

        // dispatch(goForth(i-currentToken))
    }

    if(withdrawed === true){
        return (
            <div className='token--disabled'>
                {tokenID}
            </div>
        )
    }
    else{
        return (
            <div onClick={() => onClickHandler()} className={tokenID === nftTokenId ? 'token--active':'token'}>
                {tokenID}
            </div>
        )
    }
}
