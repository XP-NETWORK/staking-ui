import { useEffect, useState} from 'react'
import { useSelector } from "react-redux"
import { nf } from '../../../../utils/helper'
import Web3 from "web3"
import { showAvailableRewards } from "../../../../utils/stake"
import { useLocation } from "react-router-dom";


export default function ClaimReward() {
    const location = useLocation();
    const stakeInfo = useSelector(state => state.data.stakeInfo)
    const rewardsWai = useSelector(state => state.stakeData.availableRewards)
    const rewards = Web3.utils.fromWei(rewardsWai, 'ether');
    const [int, setInt] = useState()
    const currentToken = useSelector(state => state.stakeData.index)
    // console.log("ClaimReward: ", stakeInfo[1])
    
    // useEffect(() => {
    //     return () => {
    //         clearInterval(int)
    //     }
    // },[])

    useEffect(async() => {
        console.log("5")
      // debugger
        if(int){clearInterval(int)}
        if(stakeInfo){
        const interval = setInterval(async() => {
            // console.log("claim use: ",stakeInfo[1] )
            await showAvailableRewards(stakeInfo[1])
        },2000)
        setInt(interval)

        await showAvailableRewards(stakeInfo[1])
        }
        
    }, [stakeInfo, currentToken])

    return (
        <div className="claim__det claim__reward">
            <div className="claim__capture">Staking Reward</div>
            <div className="claim__text">{nf.format(rewards)} XPNET</div>
        </div>
    )
}