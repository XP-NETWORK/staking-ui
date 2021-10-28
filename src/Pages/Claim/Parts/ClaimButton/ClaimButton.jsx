import React, { useEffect } from 'react'
import { claimXpNet } from "../../../../utils/stake"
import "./ClaimButton.css"
import ButtonLoader from '../../../../Components/Loader/ButtonLoader'
import { updateWithdrawed } from "../../../../redux/stakeSlice"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { useMoralis } from "react-moralis";

export default function ClaimButton({ stakeInfo, rewardsWai, address }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { Moralis } = useMoralis();
    const connectionToggler = useSelector(state => state.data.toggleConnection)
    const loader = useSelector(state => state.stakeData.withdrawed)
    const claimHandler = () => {
        claimXpNet(stakeInfo, rewardsWai, address, Moralis, connectionToggler)
        dispatch(updateWithdrawed(true))
    }

    useEffect(() => {
    }, [loader])

    if(loader){
        return (
            <>
                <div onClick={() => claimHandler()} className="claim__button"><ButtonLoader /></div>
                <div onClick={() => history.push('/stake')} className="claim__button">Stake More</div>
            </>
        )
    }
    else{
        return (
            <>
                <div onClick={() => claimHandler()} className="claim__button">Claim XPNET</div>
                <div onClick={() => history.push('/stake')} className="claim__button">Stake More</div>
            </>
        )
    }
}
