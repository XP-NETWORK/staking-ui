import axios from 'axios'
import { useEffect } from 'react'
import Loader from '../../../../Components/Loader/Loader'
import { useSelector } from "react-redux"




export default function Picture({ art, i, id }) {


    const img = useSelector(state => state.stakeData.image).filter(n => n.token === id)[0]
    let currImg
    if(img){
        // debugger
        currImg = img.url
        // console.log("img id: ", img[i].id)
    }
    
    useEffect(() => {
    }, [img])

    return (
        img ? <img src={currImg} alt="picture" /> : <Loader />
    )
}
