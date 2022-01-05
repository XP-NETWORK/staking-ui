import React from 'react'
import pages from "../../../../assets/pages.png"
import {CopyToClipboard} from 'react-copy-to-clipboard';


export default function NFTAdres(props) {
    const { currentToken, staker } = props



    return (
    <CopyToClipboard className="nft__address" text={staker}>
        <div className="address">XPNFT #{staker}</div>
    </CopyToClipboard>
    )
}
