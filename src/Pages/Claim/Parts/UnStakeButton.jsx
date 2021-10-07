import React from 'react'
import unlock from "../../../assets/unlock.png"
import { withrow } from "../../../utils/stake"

export default function UnStakeButton({ stakeInfo, address, stakerAddress }) {
    console.log(stakerAddress, address)
    if(stakerAddress) stakerAddress = stakerAddress.toLowerCase()
    if(address) address = address.toLowerCase()
    if(stakerAddress === address){
        return (
            <div className="claim__button" onClick={()=> withrow(stakeInfo, address)}>
                <img src={unlock} alt="" />
                <span>Un-Stake</span>
            </div>
            )
    }
    else return <></>
}
