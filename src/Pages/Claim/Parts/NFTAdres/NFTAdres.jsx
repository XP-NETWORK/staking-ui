import React from 'react'
import pages from "../../../../assets/pages.png"
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function NFTAdres({address}) {

    const copyToClip = () => {
        document.execCommand(address)
    }

    return (
    <div className="nft__address">
        <div className="address">{address}</div>
        <div onClick={()=> copyToClip()} className="address__icon">
            <img src={pages} alt="" />
        </div>
    </div>
    )
}
