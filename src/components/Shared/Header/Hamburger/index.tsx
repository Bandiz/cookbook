import { Link } from 'react-router-dom';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Drawer,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Hamburger.scss';
import { Logo } from '../Logo';
// import Submenu from '../Submenu';
import { useGlobalContext } from '../../../../contexts/RecipesContext';
import { ADMIN } from '../../../../constants/routes';

type Sublinks = {
    label: string;
    icon: any;
};

type HamburgerProps = {
    open: boolean;
    handleClose: () => void;
    menuLinks: { label: string; sublinks?: Sublinks[]; url: string }[];
};

export default function Hamburger({ menuLinks, handleClose, open }: HamburgerProps) {
    const { userData, categories } = useGlobalContext();

    return (
        <Drawer
            anchor="top"
            open={open}
            onClose={handleClose}
            ModalProps={{ keepMounted: true }}
            classes={{ paper: 'drawer' }}
        >
            <div className="logo" onClick={handleClose}>
                <Logo />
            </div>
            {menuLinks.map((link, index) => {
                const { label, url, sublinks } = link;
                return label === 'Recipes' ? (
                    <Accordion key={index} className="accordion">
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Link className="link-text" to={url} onClick={handleClose}>
                                {label}
                            </Link>
                        </AccordionSummary>
                        <AccordionDetails className="categories">
                            {sublinks &&
                                categories.map((category, index) => {
                                    const icon = sublinks
                                        .filter((c) => c.label === category)
                                        .map((c, index) => {
                                            return <div key={index}>{c.icon}</div>;
                                        });
                                    return (
                                        <MenuItem
                                            className="item"
                                            onClick={handleClose}
                                            key={index}
                                            component={Link}
                                            to={`/category/${category.toLowerCase()}`}
                                        >
                                            <ListItemIcon className="icon">{icon}</ListItemIcon>
                                            <ListItemText className="label" primary={category} />
                                        </MenuItem>
                                    );
                                })}
                        </AccordionDetails>
                    </Accordion>
                ) : (
                    <Accordion key={index} className="accordion" expanded={false}>
                        <AccordionSummary>
                            <Link className="link-text" to={url} onClick={handleClose}>
                                {label}
                            </Link>
                        </AccordionSummary>
                    </Accordion>
                );
            })}
            {userData?.user.isAdmin && (
                <Accordion className="accordion" expanded={false}>
                    <AccordionSummary>
                        <Link className="link-text" to={ADMIN} onClick={handleClose}>
                            Admin
                        </Link>
                    </AccordionSummary>
                </Accordion>
            )}
        </Drawer>
    );
}
