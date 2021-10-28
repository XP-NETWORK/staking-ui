import Web3 from "web3"
import "./Claim.css"
import { useEffect } from 'react'
import { getStakeById, checkIsUnLocked, tokenOfOwnerByIndex, getAmountOfTokens } from "../../utils/stake"
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
import Total from "./Parts/Total/Total"
import Withdrawn from "./Parts/Withdrawn/Withdrawn"
import { useMoralis } from "react-moralis";

export default function Claim() {
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
    const rewardWithdrawn = useSelector(state => state.stakeData.rewardWithdrawn)
    let history = useHistory();
    const stakedAmountEther = Web3.utils.fromWei(stakedAmount, 'ether');
    const connectionToggler = useSelector(state => state.data.toggleConnection)
    const { Moralis } = useMoralis();

    useEffect(async () => {

        await getAmountOfTokens(address, Moralis, connectionToggler)
        await tokenOfOwnerByIndex(tokens, address, Moralis, connectionToggler)
    }, [])

    useEffect(() => {
        // console.log("useEffect tokens: ", tokens);
        const getData = async () =>{
            await tokenOfOwnerByIndex(tokens, address, Moralis, connectionToggler)
        }
        getData()
    },[tokensFlag, tokens, address])

    const showTokens = () => {
        if(tokensArr){
            return tokensArr.map((tokenID, i) => { 
                return <NFT tokenID={tokenID} i={i} key={i}/> })
        }
    }

    useEffect(() => {
        const getData = async () => {
            await getStakeById(tokensArr[currentToken], currentToken, Moralis, connectionToggler)
            await checkIsUnLocked(currentToken, Moralis, connectionToggler)
        }
        if(!address){
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
    
    useEffect(() => {
      
    }, [address])   
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
                            <Total stakedAmount={stakedAmount} stakedAmountEther={stakedAmountEther}  period={period}/>
                            <Withdrawn withdrawn={rewardWithdrawn} />
                            <ClaimStart startTime={startTime} />
                            <End startTime={startTime} period={period} startDate={startDate} />
                            <ProgressBar period={period} startTime={startTime} startDate={startDate} />
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
                                <NFTAdres currentToken={tokensArr[currentToken]} address={address}/>
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