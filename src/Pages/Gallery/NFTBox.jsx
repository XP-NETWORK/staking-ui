import React from 'react'
import Picture from "../../Pages/Claim/Parts/Widget/Picture"
import { useDispatch } from 'react-redux';
import { updateSelected } from "../../redux/totalSupplay"
import { updateIndex, updateNftTokenIndex } from "../../redux/stakeSlice"
import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";
import { useSelector } from 'react-redux';
import { getStakeById } from "../../utils/stake"
import { useWeb3React } from '@web3-react/core' 

export default function NFTBox({url, tokenID, staker}) {
    const dispatch = useDispatch()
    const connectionToggler = useSelector(state => state.data.toggleConnection)
    const {library, connector} = useWeb3React()
    // const onClickHandler = (id) => {
    //     dispatch(updateSelected(id))
    // }

    const onClickHandler = () => {
        dispatch(updateSelected(tokenID))
        getStakeById(tokenID, tokenID, library)
        dispatch(updateIndex(tokenID))
        dispatch(updateNftTokenIndex(tokenID))
    }

    return (
        <div onClick={() => onClickHandler()} className="nft__box">
            <Link to="/search">
                <div className="nft__art">
                    <img src={url} alt="" />
                </div>
                <div className="nft__add">XPNET #{tokenID}</div>
            </Link>
        </div>
    )
}
