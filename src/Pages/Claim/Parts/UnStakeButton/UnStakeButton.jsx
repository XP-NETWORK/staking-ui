import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";

import unlockWhite from "../../../../assets/lock_openWhite.svg";
import {
    getStakeById,
    stakeAddress,
    unstakeButton,
    withrow,
} from "../../../../utils/stake";

export default function UnStakeButton({ stakeInfo, address, stakerAddress }) {
    console.log(
        "🚀 ~ file: UnStakeButton.jsx ~ line 9 ~ UnStakeButton ~ stakeInfo",
        stakeInfo
    );
    const isUnlocked = useSelector((state) => state.stakeData.isUnlocked);
    const [canUnstake, setCanUnstake] = useState();
    const [unstakeText, setUnstakeText] = useState();
    const { library, connector } = useWeb3React();
    if (stakerAddress) stakerAddress = stakerAddress.toLowerCase();
    if (address) address = address.toLowerCase();
    useEffect(async () => {
        const la = await unstakeButton(stakeInfo, stakeInfo, library);
        if (la && la.amount) {
            setCanUnstake(!la.stakeWithdrawn);
            if (la.stakeWithdrawn) setUnstakeText("NFT Already Unstaked");
        }
    }, [stakeInfo]);
    if (isUnlocked === false) {
        return <></>;
    } else {
        if (stakerAddress === address && canUnstake) {
            console.log(stakeInfo, address, stakeAddress);
            return (
                <div
                    className="claim__button"
                    onClick={() => withrow(stakeInfo, address, library)}
                >
                    <>
                        <img src={unlockWhite} alt="" />
                        <span>Un-Stake</span>
                    </>
                </div>
            );
        } else if (unstakeText)
            return (
                <>
                    <br></br>NFT was already unstaked
                </>
            );
        else return <></>;
    }
}
