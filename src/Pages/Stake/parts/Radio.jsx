import { useState } from 'react'
import checked from "../../../assets/check_box.png"
import { useDispatch, useSelector } from "react-redux"
import { updateAgreement } from "../../../redux/counterSlice"
import "./Radio.css"

export default function Radio() {
    const dispatch = useDispatch()
    const [radio, setRadio] = useState(false)

    const radioHandler = () => {
        setRadio(prev => !prev)
        dispatch(updateAgreement())
    }

    if(radio === false){
        return (
            <div onClick={() => radioHandler()} className="craftCheckBox"></div>
        )
    }
    else{
        return(
        <div onClick={() => radioHandler()} className="craftCheckBox--borderless">
            <img className="craftCheckBox--active" src={checked} alt="" />
        </div>
        )
    }
}
