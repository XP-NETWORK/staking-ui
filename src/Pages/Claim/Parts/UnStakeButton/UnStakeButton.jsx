import React from 'react'
import unlockWhite from "../../../../assets/lock_openWhite.svg"
import { withrow } from "../../../../utils/stake"
import { useSelector } from "react-redux"


export default function UnStakeButton({ stakeInfo, address, stakerAddress }) {
    const isUnlocked = useSelector(state => state.stakeData.isUnlocked)
    if(stakerAddress) stakerAddress = stakerAddress.toLowerCase()
    if(address) address = address.toLowerCase()

    if(isUnlocked === false){
        return <></>
    }
    else{
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

    // if(stakerAddress === address){
    //     return (
    //         <div className="claim__button" onClick={()=> withrow(stakeInfo, address)}>
    //             <img src={unlockWhite} alt="" />
    //             <span>Un-Stake</span>
    //         </div>
    //         )
    // }
    // else return <></>
}
