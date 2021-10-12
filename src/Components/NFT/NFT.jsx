import React from 'react'
import "./nft.css"
import { getStakeById } from "../../utils/stake"

export default function NFT({ tokenID, i }) {

    return (
        <div onClick={() => getStakeById(tokenID, i)} className="token">
            {tokenID}
        </div>
    )
}
