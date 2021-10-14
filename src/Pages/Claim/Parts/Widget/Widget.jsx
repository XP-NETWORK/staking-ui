
import art0 from "../../../../assets/arts/bigart0.png"
import art1 from "../../../../assets/arts/bigart1.png"
import art2 from "../../../../assets/arts/bigart2.png"
import art3 from "../../../../assets/arts/bigart3.png"
import leftArrow from "../../../../assets/arrow_left.svg"
import rightArrow from "../../../../assets/arrow_right.svg"
import { useSelector, useDispatch } from "react-redux"
import { updateIndex } from "../../../../redux/stakeSlice"
import "./Widget.css"
import { useState } from "react"


const arts = [
    { "art": art0 },
    { "art": art1 },
    { "art": art2 },
    { "art": art3 },
    { "art": art0 },
    { "art": art1 },
    { "art": art2 },
    { "art": art3 },
]



export default function Widget({ tokens }) {

    const [x, setX] = useState(0)
    const currentToken = useSelector(state => state.stakeData.index)
    const dispatch = useDispatch()
    const withdrawed = useSelector(state => state.stakeData.withdrawed)
    const rowLength = (tokens.length-1)*292 
    const moveX = (side) => {
        if(side==="next"){
            // debugger
            if( x === -rowLength){setX(292)}
            setX(prev=> prev-292)
        }
        else{
            // debugger
            if( x === 0){setX(-rowLength-292)}
            setX(prev=> prev+292)
        }
    }

    const swapToken = (side) => {
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

    const swiperHandler = (side) => {
        swapToken(side)
        moveX(side)
    }

    return (
        <div className="nft__widget">
            <div onClick={item => swiperHandler('prev')} className={!withdrawed ? "left-arrow arrow" : "left-arrow arrow--disabled"}><img src={leftArrow} alt="" /></div>
            <div className="widget__art">
                <div  style={{ transform: `translateX(${x}px)`}} className="art-row">
                    {arts.map( item => {
                        return (<img src={item.art} alt="picture" />)
                    })}
                </div>
            </div>
            <div onClick={item => swiperHandler('next')} className={!withdrawed ? "right-arrow arrow": "right-arrow arrow--disabled"}><img src={rightArrow} alt="" /></div>
        </div>
    )
}
