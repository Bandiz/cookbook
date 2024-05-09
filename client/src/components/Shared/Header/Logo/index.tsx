import { Link } from 'react-router-dom';
import { Image } from 'antd';
import { HOME } from '../../../../constants/routes';
import logo from './icon.png';

function Logo() {
    return (
        <Link to={HOME} style={{ display: 'flex' }}>
            <Image alt="Logo" src={logo} width={60} preview={false} />
        </Link>
    );
}

export default Logo;
