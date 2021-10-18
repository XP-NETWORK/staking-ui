
import art0 from "../../../../assets/arts/bigart0.png"
import art1 from "../../../../assets/arts/bigart1.png"
import art2 from "../../../../assets/arts/bigart2.png"
import art3 from "../../../../assets/arts/bigart3.png"
import leftArrow from "../../../../assets/arrow_left.svg"
import rightArrow from "../../../../assets/arrow_right.svg"
import { useSelector, useDispatch } from "react-redux"
import { updateIndex } from "../../../../redux/stakeSlice"
import {  chengePositionX, goForth, goBack } from "../../../../redux/counterSlice"
import "./Widget.css"
import { useState } from "react"
import Picture from "./Picture"


const arts = [
    { "art": art0, "id": 0 },
    { "art": art1, "id": 1 },
    { "art": art2, "id": 2 },
    { "art": art3, "id": 3 },
]


export default function Widget({ tokens }) {


    const x = useSelector(state => state.data.picPositionX)
    const rowLength = (tokens.length-1)*292 
    const currentToken = useSelector(state => state.stakeData.index)
    const {tokensArray} = useSelector(s => s.stakeData)
    const dispatch = useDispatch()
    const withdrawed = useSelector(state => state.stakeData.withdrawed)
    const [block, setBlock] = useState()



    const moveX = (side) => {
        if(side==="next"){
            // debugger
            if( x === -rowLength){chengePositionX(0)}
            dispatch(goForth())
        }
        else{
            // debugger
            if( x === 0){chengePositionX(-rowLength-292)}
            dispatch(goBack())
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
        if(x === 0 && side === 'prev') return;
        if(Math.abs(x) === rowLength && side === 'next') return;
        if(!block) {
            setBlock(true)
            swapToken(side)
            moveX(side)
            setTimeout(() => {setBlock(false)}, 300)
        }

    }
    const cannotClickStyle = {opacity: 0.4, pointerEvents: 'none'}
    return (
        <div className="nft__widget">
            <div style={x === 0 ? cannotClickStyle : {}} onClick={item => swiperHandler('prev')} className={!withdrawed ? "left-arrow arrow" : "left-arrow arrow--disabled"}><img src={leftArrow} alt="" /></div>
            <div className="widget__art">
                <div  style={{ transform: `translateX(${x}px)`}} className="art-row">
                    {tokensArray && tokensArray.length > 0 ?tokensArray.map(( item, index ) => {
                        // debugger
                        return (<Picture id={item} i={index} key={index} />)
                    }) : ''}
                </div>
            </div>
            <div style={Math.abs(x) === rowLength  ? cannotClickStyle : {}} onClick={item => swiperHandler('next')} className={!withdrawed ? "right-arrow arrow": "right-arrow arrow--disabled"}><img src={rightArrow} alt="" /></div>
        </div>
    )
}
