import React from 'react'
import pages from "../../../../assets/pages.png"



export default function NFTAdres({address}) {
    
    const copyTextToClipboard = async() => {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(address);
        } else {
          return document.execCommand('copy', true, address);
        }
      }

    return (
    <div className="nft__address">
        <div className="address">{address}</div>
        <div onClick={()=> copyTextToClipboard()} className="address__icon">
            <img src={pages} alt="" />
        </div>
    </div>
    )
}
