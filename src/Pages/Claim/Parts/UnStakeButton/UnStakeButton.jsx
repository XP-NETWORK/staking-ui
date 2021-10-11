import React from 'react'

import unlockWhite from "../../../../assets/lock_openWhite.svg"

import { withrow } from "../../../../utils/stake"

export default function UnStakeButton({ stakeInfo, address, stakerAddress }) {
    // console.log(stakerAddress, address)
    if(stakerAddress) stakerAddress = stakerAddress.toLowerCase()
    if(address) address = address.toLowerCase()
    if(stakerAddress === address){
        return (
            <div className="claim__button" onClick={()=> withrow(stakeInfo, address)}>
                <img src={unlockWhite} alt="" />
                <span>Un-Stake</span>
            </div>
            )
    }
    else return <></>
}
