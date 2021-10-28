import React from 'react'
import Picture from "../../Pages/Claim/Parts/Widget/Picture"

export default function NFTBox({url, tokenID, staker}) {
    return (
        <div className="nft__box">
            <div className="nft__art"><img src={url} alt="" /></div>
            <div className="nft__add">XPNET #{tokenID}</div>
        </div>
    )
}
