
import leftArrow from "../../../../assets/arrow_left.svg"
import rightArrow from "../../../../assets/arrow_right.svg"
import { useSelector, useDispatch } from "react-redux"
import { updateIndex } from "../../../../redux/stakeSlice"
import {  chengePositionX, goForth, goBack } from "../../../../redux/counterSlice"
import "./Widget.css"
import { useEffect, useState } from "react"
import Picture from "./Picture"

export default function Widget({ tokens }) {

    const images = useSelector(state => state.stakeData.image)
    const x = useSelector(state => state.data.picPositionX)
    const rowLength = (tokens.length-1)*292 
    const currentToken = useSelector(state => state.stakeData.index)
    const {tokensArray} = useSelector(s => s.stakeData)
    const dispatch = useDispatch()
    const withdrawed = useSelector(state => state.stakeData.withdrawed)
    const [block, setBlock] = useState()


    useEffect(() => {
 
    }, [images])


    const moveX = (side) => {
        if(side==="next"){
            if( x === -rowLength){chengePositionX(0)}
            dispatch(goForth())
        }
        else{
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
