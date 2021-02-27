import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const Comment = () => {
  return (
    <div className="comment-block">
      <h3 className="block-title">Write Comment</h3>
      <form action="" className="comment-form">
        <div className="comment-form-field">
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="10"
            title="write your comment"
            placeholder="Write your comment here..."
          />
        </div>
        <div className="comment-form-identity">
          <div className="comment-form-line">
            <p>Fill in your data below or sign up:</p>
            <ul className="sign-up">
              <li className="sign-up-google">
                <FaGoogle />
              </li>
              <li className="sign-up-facebook">
                <FaFacebook />
              </li>
            </ul>
          </div>
          <div className="comment-form-fill-in">
            <input name="email" type="email" id="email" placeholder="Email Address" />
            <input name="name" type="text" id="name" placeholder="Name" />
            <input type="url" name="url" id="url" placeholder="Website Address" />
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comment;
