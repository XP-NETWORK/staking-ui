import React from 'react'
import "./nft.css"
import { getStakeById } from "../../utils/stake"
import { useSelector } from 'react-redux'

export default function NFT({ tokenID, i }) {

    const nftTokenId = useSelector(state => state.stakeData.nftTokenId)

    return (
        <div onClick={() => getStakeById(tokenID, i)} className={tokenID === nftTokenId ? 'token--active':'token'}>
            {tokenID}
        </div>
    )
}
