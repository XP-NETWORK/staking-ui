import React from 'react'
import {useWeb3React} from '@web3-react/core'
import {useSelector} from 'react-redux'

import unlockWhite from '../../../../assets/lock_openWhite.svg'
import {withrow} from '../../../../utils/stake'

export default function UnStakeButton({stakeInfo, address, stakerAddress}) {
    console.log('🚀 ~ file: UnStakeButton.jsx ~ line 9 ~ UnStakeButton ~ stakeInfo', stakeInfo)
    const isUnlocked = useSelector((state) => state.stakeData.isUnlocked)
    const {library, connector} = useWeb3React()
    if (stakerAddress) stakerAddress = stakerAddress.toLowerCase()
    if (address) address = address.toLowerCase()

    if (isUnlocked === false) {
        return <></>
    } else {
        if (stakerAddress === address) {
            return (
                <div className="claim__button" onClick={() => withrow(stakeInfo, address, library)}>
                    <img src={unlockWhite} alt="" />
                    <span>Un-Stake</span>
                </div>
            )
        } else return <></>
    }
}
