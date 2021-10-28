import React from 'react'
import unlockWhite from "../../../../assets/lock_openWhite.svg"
import { withrow } from "../../../../utils/stake"
import { useSelector } from "react-redux"
import { useMoralis } from "react-moralis";

export default function UnStakeButton({ stakeInfo, address, stakerAddress }) {
    const isUnlocked = useSelector(state => state.stakeData.isUnlocked)
    const { Moralis } = useMoralis();
    const connectionToggler = useSelector(state => state.data.toggleConnection)
    const loader = useSelector(state => state.stakeData.withdrawed)
    if(stakerAddress) stakerAddress = stakerAddress.toLowerCase()
    if(address) address = address.toLowerCase()

    if(isUnlocked === false){
        return <></>
    }
    else{
        if(stakerAddress === address){
            return (
                <div className="claim__button" onClick={()=> withrow(stakeInfo, address, Moralis, connectionToggler)}>
                    <img src={unlockWhite} alt="" />
                    <span>Un-Stake</span>
                </div>
                )
        }
        else return <></>
    }
}
