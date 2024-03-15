import { AiFillMail, AiFillPrinter } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';

import './Share.scss';

export default function Share() {
    return (
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
    );
}
