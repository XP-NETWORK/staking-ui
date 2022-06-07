import axios from 'axios'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'

import Loader from '../../../../Components/Loader/Loader'

export default function Picture({art, i, id}) {
    const img = useSelector((state) => state.stakeData.image).filter((n) => n.token === id)[0]
    let currImg
    if (img) {
        currImg = img.url
    }

    useEffect(() => {}, [img])

    return img ? <img src={currImg} alt="picture" /> : <Loader />
}
