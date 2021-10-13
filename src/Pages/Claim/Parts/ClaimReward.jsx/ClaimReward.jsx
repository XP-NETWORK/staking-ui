import { useEffect, useState} from 'react'
import { useSelector } from "react-redux"
import { nf } from '../../../../utils/helper'
import Web3 from "web3"
import { showAvailableRewards } from "../../../../utils/stake"

export default function ClaimReward() {
    const stakeInfo = useSelector(state => state.data.stakeInfo)
    const rewardsWai = useSelector(state => state.stakeData.availableRewards)
    const rewards = Web3.utils.fromWei(rewardsWai, 'ether');
    const [int, setInt] = useState()
    const currentToken = useSelector(state => state.stakeData.index)

    const doSome = () => {
        console.log("some")
        clearInterval(int)
    }

    useEffect(() => {
        // debugger`
        if(int){clearInterval(int)}
    }, [int])

    useEffect(() => {
        if(int){clearInterval(int)}
        const getData = async () => {
            await showAvailableRewards(stakeInfo[1])
        }
        if(stakeInfo){
        const interval = setInterval(async() => {
            getData()
            // await showAvailableRewards(stakeInfo[1])
        },2000)
        setInt(interval)
        getData()
        // await showAvailableRewards(stakeInfo[1])
        }
    }, [stakeInfo, currentToken])

    return (
        <div className="claim__det claim__reward">
            <div className="claim__capture">Staking Reward</div>
            <div className="claim__text">{nf.format(rewards)} XPNET</div>
        </div>
    )
}
