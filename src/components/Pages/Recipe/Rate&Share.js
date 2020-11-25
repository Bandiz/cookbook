import React from "react";
import { SiGmail } from "react-icons/si";
import { AiFillMail, AiFillPrinter, AiFillStar } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

const RateShare = () => {
  return (
    <div>
      <div className="rating-block">
        <h3 className="block-title">Rate this:</h3>
        <div className="rating-holder">
          <div className="rating-stars">
            <div className="rating-star-icon">
              <AiFillStar />
            </div>
            <div className="rating-star-icon">
              <AiFillStar />
            </div>
            <div className="rating-star-icon">
              <AiFillStar />
            </div>
            <div className="rating-star-icon">
              <AiFillStar />
            </div>
            <div className="rating-star-icon">
              <AiFillStar />
            </div>
          </div>
          <div className="rating-msg">responsive rating message</div>
        </div>
      </div>
      <div className="sharing-block">
        <h3 className="block-title">Liked? Share it!</h3>
        <ul className="icon-list">
          <li className="share share-fb">
            <FaFacebook />
          </li>
          <li className="share share-email">
            <SiGmail/>
          </li>
          <li className="share share-print">
            <AiFillPrinter />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RateShare;
