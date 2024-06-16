import { Avatar, Button, Layout, Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { useLogoutSessionMutation } from '../../../api/session';
import { ABOUT, ADMIN, HOME, LOGIN, RECIPES } from '../../../constants/routes';
import { useAuth } from '../../../contexts/AuthContext';
import Logo from './Logo';

function Header() {
    const navigate = useNavigate();
    const logoutSessionMutation = useLogoutSessionMutation();
    const { isAuthenticated, isAdmin } = useAuth();

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === HOME) {
            navigate(HOME);
        } else if (e.key === RECIPES) {
            navigate(RECIPES);
        } else if (e.key === ABOUT) {
            navigate(ABOUT);
        } else if (e.key === ADMIN) {
            navigate(ADMIN);
        } else if (e.key === 'logout') {
            logoutSessionMutation.mutate();
        }
    };

    return (
        <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ flex: 1, minWidth: 0 }}
                selectable={false}
                onClick={onClick}
                items={[
                    {
                        key: HOME,
                        label: 'Home',
                    },
                    {
                        key: RECIPES,
                        label: 'Recipes',
                    },
                    {
                        key: ABOUT,
                        label: 'About',
                    },
                ]}
            />
            {!isAuthenticated ? (
                <Button
                    icon={<LoginOutlined />}
                    type="text"
                    style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                    onClick={() => navigate(LOGIN)}
                >
                    Login
                </Button>
            ) : (
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ flex: 0 }}
                    selectable={false}
                    onClick={onClick}
                    items={[
                        {
                            key: '',
                            label: '',
                            icon: (
                                <Avatar
                                    size="large"
                                    icon={<UserOutlined />}
                                    style={{
                                        backgroundColor: '#f56a00',
                                        verticalAlign: 'middle',
                                    }}
                                />
                            ),
                            children: [
                                ...(isAdmin ? [{ label: 'Admin', key: ADMIN }] : []),
                                { label: 'Logout', key: 'logout' },
                            ],
                        },
                    ]}
                />
            )}
        </Layout.Header>
    );
}

export default Header;
