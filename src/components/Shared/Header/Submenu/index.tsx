import { Link } from 'react-router-dom';
import { SubmenuProps } from '../types';

import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import './Submenu.scss';

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
