import bigart from "../../../../assets/bigart.png"
import leftArrow from "../../../../assets/arrow_left.svg"
import rightArrow from "../../../../assets/arrow_right.svg"
import { useSelector, useDispatch } from "react-redux"
import { updateIndex } from "../../../../redux/stakeSlice"
import "./Widget.css"

export default function Widget({ tokens }) {

    const stakeInfo = useSelector(state => state.data.stakeInfo)
    const currentToken = useSelector(state => state.stakeData.index)
    const dispatch = useDispatch()

    
    const swapToken = (side) => {
        debugger
   
        if(tokens.length > 1){
            if(side === "next"){
                dispatch(updateIndex(currentToken+1))
                if(currentToken===tokens.length-1){dispatch(updateIndex(0))}
            }
            else{
                dispatch(updateIndex(currentToken-1))
                if(currentToken===0){dispatch(updateIndex(tokens.length-1))}
            }
        }
    }

    return (
        <div className="nft__widget">
            <div onClick={item => swapToken('prev')} className="left-arrow arrow"><img src={leftArrow} alt="" /></div>
            <div className="widget__art">
                <img src={bigart} alt="widget" />
            </div>
            <div onClick={item => swapToken('next')} className="right-arrow arrow"><img src={rightArrow} alt="" /></div>
        </div>
    )
}
