import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import Web3 from 'web3'
import {useWeb3React} from '@web3-react/core'

import {nf} from '../../../../utils/helper'
import {showAvailableRewards} from '../../../../utils/stake'

export default function ClaimReward() {
    const stakeInfo = useSelector((state) => state.data.stakeInfo)
    const rewardsWai = useSelector((state) => state.stakeData.availableRewards)
    const rewards = Web3.utils.fromWei(rewardsWai, 'ether')
    const [int, setInt] = useState()
    const currentToken = useSelector((state) => state.stakeData.index)
    const {library, connector} = useWeb3React()

    useEffect(() => {
        if (int) {
            clearInterval(int)
        }
    }, [int])

    useEffect(() => {
        if (int) {
            clearInterval(int)
        }
        const getData = async () => {
            await showAvailableRewards(stakeInfo[1], library)
        }
        if (stakeInfo) {
            const interval = setInterval(async () => {
                getData()
            }, 2000)
            setInt(interval)
            getData()
        }
    }, [stakeInfo, currentToken])

    return (
        <div className="claim__det claim__reward">
            <div className="claim__capture">Rewards</div>
            <div className="claim__text green">{nf.format(rewards)} XPNET</div>
        </div>
    )
}
