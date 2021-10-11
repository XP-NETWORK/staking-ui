import React from 'react'
import pages from "../../../../assets/pages.png"

export default function NFTAdres({address}) {


    return (
    <div className="nft__address">
        <div className="address">{address}</div>
        <div className="address__icon">
            <img src={pages} alt="" />
        </div>
    </div>
    )
}
