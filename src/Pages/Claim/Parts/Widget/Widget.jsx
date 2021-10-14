
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


// const arts = [
//     { "art": art0, "id": 0 },
//     { "art": art1, "id": 1 },
//     { "art": art2, "id": 2 },
//     { "art": art3, "id": 3 },
//     { "art": art0, "id": 4 },
//     { "art": art1, "id": 5 },
//     { "art": art2, "id": 6 },
//     { "art": art3, "id": 7 },
//     { "art": art0, "id": 8 },
//     { "art": art1, "id": 9 },
//     { "art": art2, "id": 10 },
//     { "art": art3, "id": 11 },
//     { "art": art0, "id": 12 },
//     { "art": art1, "id": 13 },
//     { "art": art2, "id": 14 },
//     { "art": art3, "id": 15 },
//     { "art": art0, "id": 16 },
//     { "art": art1, "id": 17 },
//     { "art": art2, "id": 18 },
//     { "art": art3, "id": 19 },
//     { "art": art0, "id": 0 },
//     { "art": art1, "id": 1 },
//     { "art": art2, "id": 2 },
//     { "art": art3, "id": 3 },
//     { "art": art0, "id": 4 },
//     { "art": art1, "id": 5 },
//     { "art": art2, "id": 6 },
//     { "art": art3, "id": 7 },
//     { "art": art0, "id": 8 },
//     { "art": art1, "id": 9 },
//     { "art": art2, "id": 10 },
//     { "art": art3, "id": 11 },
//     { "art": art0, "id": 12 },
//     { "art": art1, "id": 13 },
//     { "art": art2, "id": 14 },
//     { "art": art3, "id": 15 },
//     { "art": art0, "id": 16 },
//     { "art": art1, "id": 17 },
//     { "art": art2, "id": 18 },
//     { "art": art3, "id": 19 },
//     { "art": art0, "id": 0 },
//     { "art": art1, "id": 1 },
//     { "art": art2, "id": 2 },
//     { "art": art3, "id": 3 },
//     { "art": art0, "id": 4 },
//     { "art": art1, "id": 5 },
//     { "art": art2, "id": 6 },
//     { "art": art3, "id": 7 },
//     { "art": art0, "id": 8 },
//     { "art": art1, "id": 9 },
//     { "art": art2, "id": 10 },
//     { "art": art3, "id": 11 },
//     { "art": art0, "id": 12 },
//     { "art": art1, "id": 13 },
//     { "art": art2, "id": 14 },
//     { "art": art3, "id": 15 },
//     { "art": art0, "id": 16 },
//     { "art": art1, "id": 17 },
//     { "art": art2, "id": 18 },
//     { "art": art3, "id": 19 },
//     { "art": art0, "id": 0 },
//     { "art": art1, "id": 1 },
//     { "art": art2, "id": 2 },
//     { "art": art3, "id": 3 },
//     { "art": art0, "id": 4 },
//     { "art": art1, "id": 5 },
//     { "art": art2, "id": 6 },
//     { "art": art3, "id": 7 },
//     { "art": art0, "id": 8 },
//     { "art": art1, "id": 9 },
//     { "art": art2, "id": 10 },
//     { "art": art3, "id": 11 },
//     { "art": art0, "id": 12 },
//     { "art": art1, "id": 13 },
//     { "art": art2, "id": 14 },
//     { "art": art3, "id": 15 },
//     { "art": art0, "id": 16 },
//     { "art": art1, "id": 17 },
//     { "art": art2, "id": 18 },
//     { "art": art3, "id": 19 },
// ]

const arts = [
    { "art": art0, "id": 0 },
    { "art": art1, "id": 1 },
    { "art": art2, "id": 2 },
    { "art": art3, "id": 3 },
]


export default function Widget({ tokens }) {

    // const [x, setX] = useState(0)
    const x = useSelector(state => state.data.picPositionX)
    console.log(x)
    const rowLength = (tokens.length-1)*292 
    const currentToken = useSelector(state => state.stakeData.index)
    const dispatch = useDispatch()
    const withdrawed = useSelector(state => state.stakeData.withdrawed)
    const picPositionX = useSelector(state => state.data.picPositionX)
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
        console.log(x, rowLength, 'hksdlfds')
        if(x === 0 && side === 'prev') return;
        if(Math.abs(x) === rowLength && side === 'next') return;
        if(!block) {
            setBlock(true)
            swapToken(side)
            moveX(side)
            setTimeout(() => {setBlock(false)}, 300)
        }

    }

    return (
        <div className="nft__widget">
            <div onClick={item => swiperHandler('prev')} className={!withdrawed ? "left-arrow arrow" : "left-arrow arrow--disabled"}><img src={leftArrow} alt="" /></div>
            <div className="widget__art">
                <div  style={{ transform: `translateX(${x}px)`}} className="art-row">
                    {arts.map( item => {
                        return (<Picture art={item.art} id={item.id} />)
                    })}
                </div>
            </div>
            <div onClick={item => swiperHandler('next')} className={!withdrawed ? "right-arrow arrow": "right-arrow arrow--disabled"}><img src={rightArrow} alt="" /></div>
        </div>
    )
}
