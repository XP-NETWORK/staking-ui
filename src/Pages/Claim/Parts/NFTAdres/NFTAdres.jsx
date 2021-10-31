import React from 'react'
import pages from "../../../../assets/pages.png"



export default function NFTAdres(props) {
    const { currentToken } = props

    const copyTextToClipboard = async() => {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(`XPNFT #${currentToken}`);
        } else {
          return document.execCommand('copy', true, `XPNFT #${currentToken}`);
        }
      }

    return (
    <div className="nft__address">
        <div className="address">XPNFT #{currentToken}</div>
        <div onClick={()=> copyTextToClipboard()} className="address__icon">
            <img src={pages} alt="" />
        </div>
    </div>
    )
}
