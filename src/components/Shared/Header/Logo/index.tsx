import { Link } from 'react-router-dom';
import { HOME } from '../../../../constants/routes';
import { Box } from '@mui/material';

import logo from './icon.png';

const Logo = () => {
    return (
        <Link to={HOME}>
            <Box
                component="img"
                alt="Logo"
                src={logo}
                sx={{
                    width: { xs: 60, md: 80 },
                }}
            />
        </Link>
    );
};
export default Logo;
