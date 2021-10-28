import React, { useEffect } from 'react'
import "./Gallery.css"
import  magnifier  from "../../assets/magnifier.svg"
import NFTBox from './NFTBox'
import { useSelector } from 'react-redux'
import { useMoralis } from "react-moralis";
import { totalSupply } from "../../utils/stake"

export default function Gallery() {

    const image = useSelector(state => state.stakeData.image)
    const connectionToggler = useSelector(state => state.data.toggleConnection)
    const { Moralis } = useMoralis();

    useEffect(() => {
        totalSupply(Moralis, connectionToggler)
    }, [])

    console.log("tokens: ", image)
    const showGallery = () => {
        if(image.length > 0){ 
            return image.map( (item, index) => {
                return <NFTBox url={item.url} key={index} tokenID={item.token} />
            })
        }
    }
    return (
        <div className="gallery__wrapper">
            <div className="gallery__header">XPNET NFT Collection</div>
            <div className="gallery__search">
                <input placeholder="Search" type="search" name="nft-search" id="nft-search" className="nft-search" />
                <div className="nft-search__items"><img src={magnifier} alt="" /></div>
            </div>
            <div className="gallery__container">
                { showGallery() }
            </div>
        </div>
    )
}
