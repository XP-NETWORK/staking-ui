import React from 'react'
import "./Gallery.css"
import  magnifier  from "../../assets/magnifier.svg"
import NFTBox from './NFTBox'
import { useSelector } from 'react-redux'


export default function Gallery() {

    const image = useSelector(state => state.stakeData.image)

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
