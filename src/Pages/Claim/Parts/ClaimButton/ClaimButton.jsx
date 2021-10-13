import React, { useEffect } from 'react'
import { claimXpNet } from "../../../../utils/stake"
import "./ClaimButton.css"
import ButtonLoader from '../../../../Components/Loader/ButtonLoader'
import { updateWithdrawed } from "../../../../redux/stakeSlice"
import { useSelector, useDispatch } from 'react-redux'

export default function ClaimButton({ stakeInfo, rewardsWai, address }) {
    const dispatch = useDispatch()
    const loader = useSelector(state => state.stakeData.withdrawed)
    const claimHandler = () => {
        claimXpNet(stakeInfo, rewardsWai, address)
        dispatch(updateWithdrawed(true))
    }

    useEffect(() => {
    }, [loader])

    if(loader){
        return (
            <div onClick={() => claimHandler()} className="claim__button"><ButtonLoader /></div>
        )
    }
    else{
        return (
            <div onClick={() => claimHandler()} className="claim__button">Claim XPNET</div>
        )
    }
}
