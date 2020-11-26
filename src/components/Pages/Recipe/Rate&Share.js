import React, { useState } from "react";
import { AiFillMail, AiFillPrinter, AiFillStar } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

const RateShare = () => {
  const [rate, setRate] = useState("Vote!");
  const Rating = (e) => {
    let vote = e.currentTarget.id;
    if (vote === "1") {
      return setRate("Very Poor");
    }
    if (vote === "2") {
      return setRate("Poor");
    }
    if (vote === "3") {
      return setRate("Average");
    }
    if (vote === "4") {
      return setRate("Good");
    }
    if (vote === "5") {
      return setRate("Excellent");
    }
    return rate;
  };
  return (
    <div>
      <div className="rating-block">
        <h3 className="block-title">Rate this:</h3>
        <div className="rating-holder">
          <div className="rating-stars">
            <div className="rating-star-icon" id="1" onMouseOver={Rating}>
              <AiFillStar />
            </div>
            <div className="rating-star-icon" id="2" onMouseOver={Rating}>
              <AiFillStar />
            </div>
            <div className="rating-star-icon" id="3" onMouseOver={Rating}>
              <AiFillStar />
            </div>
            <div className="rating-star-icon" id="4" onMouseOver={Rating}>
              <AiFillStar />
            </div>
            <div className="rating-star-icon" id="5" onMouseOver={Rating}>
              <AiFillStar />
            </div>
          </div>
          <div className="rating-msg" id="msg">
            {rate}
          </div>
        </div>
      </div>
      <div className="sharing-block">
        <h3 className="block-title">Liked? Share it!</h3>
        <ul className="icon-list">
          <li className="share share-fb">
            <FaFacebook />
          </li>
          <li className="share share-email">
            <AiFillMail />
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
