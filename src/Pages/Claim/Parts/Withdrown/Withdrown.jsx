import React from 'react'
import Web3 from 'web3'

import {nf} from '../../../../utils/helper'
export default function Withdrawn({withdrawn}) {
    const rewards = withdrawn ? Web3.utils.fromWei(`${withdrawn}`.toString(), 'ether') : 0
    return (
        <div className="claim__det claim__end">
            <div className="claim__capture">Withdrawn</div>
            <div className="claim__text">{rewards ? nf.format(rewards) : '0'} XPNET</div>
        </div>
    )
}
