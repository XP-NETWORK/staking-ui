import axios from 'axios'
import { useEffect } from 'react'
import Loader from '../../../../Components/Loader/Loader'
import { useSelector } from "react-redux"
import { initMetaMask } from '../../../../utils/metamask'



export default function Picture({ id }) {


    
    const img = useSelector(state => state.stakeData.image).filter(n => n.token === id)[0]
    let currImg
    
    if(img){
        currImg = img.url
    }
    
    useEffect(() => {
    }, [img])

    return (
        img ? <img src={currImg} alt="picture" /> : <Loader />
    )
}
