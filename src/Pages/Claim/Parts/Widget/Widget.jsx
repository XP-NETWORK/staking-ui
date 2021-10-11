import { React, useEffect} from 'react'
import bigart from "../../../../assets/bigart.png"
import leftArrow from "../../../../assets/arrow_left.svg"
import rightArrow from "../../../../assets/arrow_right.svg"
import { getStakeById } from "../../../../utils/stake"
import { useSelector } from "react-redux"
import "./Widget.css"

export default function Widget({ tokens }) {
    console.log("widget", tokens)
    const stakeInfo = useSelector(state => state.data.stakeInfo)
    const tokenId = parseInt(stakeInfo[6])
    const tokenIndex = useSelector(state => state.stakeData.nftTokenIndex)
   
    
    const swapToken = (side) => {
        // debugger
        // console.log(side)
        if(tokens.length > 1){
            if(side === "right"){
                if(tokenIndex === tokens.length){
                    getStakeById(0)
                }
                else getStakeById(tokenIndex + 1)
            }
            else{
                if(tokenIndex === 0){
                    getStakeById(tokens.length)
                }
                else getStakeById(tokenIndex - 1)
            }
        }
    }

    // useEffect(() => {
    // console.log("Rerender widget.")
    // }, [tokens])

    return (
        <div className="nft__widget">
            <div onClick={item => swapToken('left')} className="left-arrow arrow"><img src={leftArrow} alt="" /></div>
            <div className="widget__art">
                <img src={bigart} alt="widget" />
            </div>
            <div onClick={item => swapToken('right')} className="right-arrow arrow"><img src={rightArrow} alt="" /></div>
        </div>
    )
}
