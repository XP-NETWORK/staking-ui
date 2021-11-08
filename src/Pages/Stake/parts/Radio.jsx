import { useEffect, useState } from 'react'
import checked from "../../../assets/check_box.svg"
import { useDispatch, useSelector } from "react-redux"
import { updateAgreement } from "../../../redux/counterSlice"
import "./Radio.css"

export default function Radio() {
    const dispatch = useDispatch()
    const [radio, setRadio] = useState(false)
    const {agreement} = useSelector(s => s.data)
    const radioHandler = () => {
        setRadio(prev => !prev)
        dispatch(updateAgreement())
    }
    useEffect(() => {

    },[])
    if(agreement === false){
        return (
            <div><div onClick={() => radioHandler()} className="craftCheckBox"></div></div>
        )
    }
    else{
        return(
        <div>
            <div onClick={() => radioHandler()} className="craftCheckBox--borderless">
                <img className="craftCheckBox--active" src={checked} alt="" />
            </div>
        </div>
        )
    }
}
