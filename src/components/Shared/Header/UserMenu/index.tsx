import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN } from '../../../../constants/routes';

import Logout from '@mui/icons-material/Logout';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { User } from '../../../../api/session/types';
import { useLogoutSessionMutation } from '../../../../api/session';
import { useAuth } from '../../../../contexts/AuthContext';

const UserMenu = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const logoutSessionMutation = useLogoutSessionMutation();

    const avatarColor = useMemo(() => {
        if (!user) {
            return '#ffffff';
        }
        return stringToColor(user.name);
    }, [user]);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    if (!user) {
        return null;
    }

    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }

        return color;
    }

    function stringAvatar(user: User) {
        const { name, lastName } = user;
        return {
            sx: {
                bgcolor: avatarColor,
            },
            children: `${name[0]}${lastName[0]}`,
        };
    }

    return (
        <>
            <Tooltip title="Account">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Avatar {...stringAvatar(user)} sx={{ width: 32, height: 32 }}></Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                {user.isAdmin && (
                    <MenuItem
                        onClick={() => {
                            navigate(ADMIN);
                        }}
                    >
                        <ListItemIcon>
                            <AdminPanelSettingsIcon fontSize="small" />
                        </ListItemIcon>
                        Admin
                    </MenuItem>
                )}
                <MenuItem onClick={() => logoutSessionMutation.mutate()}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};
export default UserMenu;
