import { useEffect } from 'react'
import "./nft.css"
import { getStakeById } from "../../utils/stake"
import { useSelector, useDispatch } from 'react-redux'
import { updateIndex, updateNftTokenIndex } from "../../redux/stakeSlice"
import {  goBack } from "../../redux/counterSlice"
import { useWeb3React } from '@web3-react/core'

export default function NFT({ tokenID, i }) {
    const dispatch = useDispatch()
    const withdrawed = useSelector(state => state.stakeData.withdrawed)
    const nftTokenId = useSelector(state => state.stakeData.nftTokenId)
    const currentToken = useSelector(state => state.stakeData.nftTokenIndex)
    const img = useSelector(state => state.stakeData.image).filter(n => n.token === tokenID)[0]
    const {library, connector} = useWeb3React()

    const onClickHandler = () => {
        getStakeById(tokenID, i, library)
        dispatch(updateIndex(i))
        dispatch(updateNftTokenIndex(i))
        dispatch(goBack(currentToken - i))
    }


    let currImg
    if(img){
        currImg = img.url
    }


    if(withdrawed === true){
        return (
            <div className='token--disabled'>
                <img src={currImg} alt="" />
            </div>
        )
    }
    else{
        return (
            <div onClick={() => onClickHandler()} className={tokenID === nftTokenId ? 'token--active':'token'}>
                <img src={currImg} alt="" />
            </div>
        )
    }
}
