import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../../../Components/Loader/Loader'

export default function Picture({ art, id }) {
    console.log(id, 'hello')
    const [img, setImg] = useState()
    useEffect(async () => {
    //https://staking-api.xp.network/staking-nfts/3
        const res = await axios.get(`https://staking-api.xp.network/staking-nfts/${id}`)
        if(res) {
            const { image } = res.data
            setImg(image)
        }
    },[])
    return (
       img ? <img src={img} alt="picture" /> : <Loader />
    )
}
