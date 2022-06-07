import React from "react";

import { Link } from "react-router-dom";

import image from "../../../assets/xpnetart.jpeg";
// import { getPercent } from "../../../utils/helper"
import "./Reawards.css";

export default function Reawards({ durations, duration }) {
  return (
    <div className="stake__rewards">
      <div className="rewards">
        <div className="rewards__widget">
          <img src={image} alt="Reward art" />
        </div>
        <div className="rewards__content">
          <div className="rewards__subtitle">
            Don't wait 3 months - get your NFT Reward right NOW
          </div>
          <div className="rewards__text">
            A unique chain-agnostic NFT that serves as the access key to staking
            rewards.
          </div>
          <Link className="gallery-link" to="/gallery">
            View NFT collection
          </Link>
        </div>
      </div>
    </div>
  );
}
