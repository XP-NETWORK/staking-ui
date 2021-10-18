import Web3 from "web3"
import "./Claim.css"
import { useEffect } from 'react'
import { getStakeById, checkIsUnLocked, tokenOfOwnerByIndex } from "../../utils/stake"
import { useSelector } from "react-redux"
import { useHistory } from 'react-router'
import NFT from '../../Components/NFT/NFT'
import ClaimReward from './Parts/ClaimReward.jsx/ClaimReward'
import ClaimAmount from './Parts/ClaimAmount/ClaimAmount'
import ClaimAPY from './Parts/ClaimAPY/ClaimAPY'
import ClaimStart from './Parts/ClaimStart/ClaimStart'
import ProgressBar from './Parts/ProgressBar/ProgressBar'
import End from './Parts/End/End'
import NFTAdres from './Parts/NFTAdres/NFTAdres'
import ClaimButton from './Parts/ClaimButton/ClaimButton'
import UnStakeButton from './Parts/UnStakeButton/UnStakeButton'
import Loader from '../../Components/Loader/Loader'
import Widget from './Parts/Widget/Widget'
 
export default function Claim() {
    const balance = useSelector(state => state.data.balance)
    const address = useSelector(state => state.data.account)
    const tokensArr = useSelector(state => state.stakeData.tokensArray)
    const stakeInfo = useSelector(state => state.data.stakeInfo)
    const stakedAmount = useSelector(state => state.stakeData.amount)
    const period = useSelector(state => state.stakeData.duration)
    const startTime = useSelector(state => state.stakeData.startTime)
    const startDate = useSelector(state => state.stakeData.startDate)
    const rewardsWai = useSelector(state => state.stakeData.availableRewards)
    const currentToken = useSelector(state => state.stakeData.index)

    const tokensFlag = useSelector(state => state.stakeData.tokensAmountFlag)
    const tokens = useSelector(state => state.stakeData.tokensAmount)



    let history = useHistory();
    const stakedAmountEther = Web3.utils.fromWei(stakedAmount, 'ether');
    

    useEffect(() => {
        console.log("hello")
        const getData = async () =>{
            // debugger
            await tokenOfOwnerByIndex(tokensFlag, tokens, address)
        }
        getData()
    },[tokensArr])

    const showTokens = () => {
        if(tokensArr){
            return tokensArr.map((tokenID, i) => { 
                return <NFT tokenID={tokenID} i={i} key={i}/> })
        }
    }

    useEffect(() => {
        const getData = async () => {
            await getStakeById(tokensArr[currentToken], currentToken)
            await checkIsUnLocked(currentToken)
        }
        if(!address || !balance){
            history.push("/stake")
        }
        if(!stakeInfo){
            if(tokensArr){
            getData()
            }
        }
        else{
            if(tokensArr){
            getData()
            }
        }
    
    }, [tokensArr, currentToken])

    useEffect(() => {
    }, [stakeInfo])    

        if(tokensArr){
            return (
                <div className="claim__container">
                    <div className="claim">
                        <div className="claim__title">Staking Reward</div>
                        <div className="line"></div>
                        <div className="claim__details">
                            <ClaimAmount stakedAmount={stakedAmount} stakedAmountEther={stakedAmountEther}/>
                            <ClaimAPY period={period} />
                            <ClaimReward />
                            <ClaimStart startTime={startTime} />
                            <End startTime={startTime} period={period} startDate={startDate} />
                            <ProgressBar period={period} startTime={startTime} />
                            <ClaimButton stakeInfo={stakeInfo[1]} rewardsWai={rewardsWai} address={address} />
                            <UnStakeButton stakeInfo={stakeInfo[1]} address={address} stakerAddress={stakeInfo[5]} />
                        </div>
                    </div>
                    <div className="nft__wrapper">
                        <div className="nft">
                            <div className="nft__title">NFT</div>
                            <div className="line"></div>
                            <div className="nft__content">
                                <Widget tokens={tokensArr} />
                                <NFTAdres address={address}/>
                            </div>
                        </div>
                        <div className="nfts__toggler">
                            { showTokens() }
                        </div>  
                    </div>
                </div>
            )
        }
        else{
            return <Loader />
        }
   
}