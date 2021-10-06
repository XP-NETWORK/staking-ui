import React from 'react'
import "./nft.css"
import { getStakeById } from "../../utils/stake"

export default function NFT({ item }) {
    return (
        <div onClick={() => getStakeById(item)} className="token">
            {item}
        </div>
    )
}
