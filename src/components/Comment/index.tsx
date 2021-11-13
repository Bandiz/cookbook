import { FaGoogle } from 'react-icons/fa';

import './Comment.scss';

export default function Comment() {
    return (
        <div className="comment-block">
            <h3 className="block-title">Write Comment</h3>
            <div className="comment-form-identity">
                <div className="comment-form-line">
                    <p>Sign up to comment:</p>
                    <ul className="sign-up">
                        <li className="sign-up-google">
                            <FaGoogle />
                        </li>
                    </ul>
                </div>
                <form action="" className="comment-form">
                    <div className="comment-form-field">
                        <textarea
                            name="comment"
                            id="comment"
                            title="write your comment"
                            placeholder="Write your comment here..."
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
