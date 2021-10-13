import React from 'react'
import "./nft.css"
import { getStakeById } from "../../utils/stake"
import { useSelector, useDispatch } from 'react-redux'
import { updateIndex } from "../../redux/stakeSlice"

export default function NFT({ tokenID, i }) {
    const dispatch = useDispatch()
    const withdrawed = useSelector(state => state.stakeData.withdrawed)
    const nftTokenId = useSelector(state => state.stakeData.nftTokenId)
    console.log("withdrawed: ", withdrawed)

    const onClickHandler = () => {
        getStakeById(tokenID, i)
        dispatch(updateIndex(i))
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
