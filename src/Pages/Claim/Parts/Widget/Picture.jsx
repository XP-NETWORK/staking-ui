import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../../../Components/Loader/Loader'
import { useSelector } from "react-redux"



export default function Picture({ art, i }) {

    
    const img = useSelector(state => state.stakeData.image[i])
    let currImg
    if(img){
        // debugger
        currImg = img.url
        // console.log("img id: ", img[i].id)
    }
    
    useEffect(() => {
    }, [img])

    // const [img, setImg] = useState()
    // useEffect(() => {
    // //https://staking-api.xp.network/staking-nfts/3
    // const getPicture = async () => {
    //     const res = await axios.get(`https://staking-api.xp.network/staking-nfts/${id}`)
    //     if(res) {
    //         const { image } = res.data
    //         setImg(image)
    //     }
    // }
    //     getPicture()
    // },[])
    return (
        img ? <img src={currImg} alt="picture" /> : <Loader />
    )
}
