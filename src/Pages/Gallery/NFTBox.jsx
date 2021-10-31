import React from 'react'
import Picture from "../../Pages/Claim/Parts/Widget/Picture"
import { useDispatch } from 'react-redux';
import { updateSelected } from "../../redux/totalSupply"
import { updateIndex, updateNftTokenIndex } from "../../redux/stakeSlice"
import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";
import { useSelector } from 'react-redux';
import { getStakeById } from "../../utils/stake"


export default function NFTBox({url, tokenID, staker}) {
    const dispatch = useDispatch()
    const connectionToggler = useSelector(state => state.data.toggleConnection)
    const { Moralis } = useMoralis();
    // const onClickHandler = (id) => {
    //     dispatch(updateSelected(id))
    // }

    const onClickHandler = () => {
        getStakeById(tokenID, tokenID, Moralis, connectionToggler)
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
