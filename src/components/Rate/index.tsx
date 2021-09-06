import { useState } from "react";

import { AiFillStar } from "react-icons/ai";
import "./Rate.scss";

export default function Rate() {
    const [rate, setRate] = useState("Vote!");
    const Rating = (e: React.MouseEvent) => {
        const vote = e.currentTarget.id;
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
    );
}
