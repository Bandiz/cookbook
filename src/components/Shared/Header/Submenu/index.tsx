import { Link } from 'react-router-dom';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import './Submenu.scss';
import { SubmenuProps } from '../types';

export default function Submenu({ handleClose, menuLinks }: SubmenuProps) {
    return (
        <div className="submenu">
            {menuLinks
                .filter((recipes) => recipes.label === 'Recipes')
                .map((link) =>
                    link.sublinks?.map((sublink, index) => {
                        const { label, icon, subUrl } = sublink;
                        return (
                            <MenuItem className="item" onClick={handleClose} key={index} component={Link} to={subUrl}>
                                <ListItemIcon className="icon">{icon}</ListItemIcon>
                                <ListItemText className="label" primary={label} />
                            </MenuItem>
                        );
                    })
                )}
        </div>
    );
}
