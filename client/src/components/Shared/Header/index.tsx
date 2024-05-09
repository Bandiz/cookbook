import { useNavigate } from 'react-router-dom';
import { Avatar, Layout, Menu, MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/AuthContext';
import { ABOUT, ADMIN, HOME, LOGIN, RECIPES } from '../../../constants/routes';
import { useLogoutSessionMutation } from '../../../api/session';
import Logo from './Logo';

function Header() {
    const navigate = useNavigate();
    const logoutSessionMutation = useLogoutSessionMutation();
    const { isAuthenticated } = useAuth();
    const { isAdmin } = useAuth();

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === HOME) {
            navigate(HOME);
        } else if (e.key === RECIPES) {
            navigate(RECIPES);
        } else if (e.key === ABOUT) {
            navigate(ABOUT);
        } else if (e.key === LOGIN) {
            navigate(LOGIN);
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
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ minWidth: 0 }}
                selectable={false}
                onClick={onClick}
                items={[
                    ...(!isAuthenticated
                        ? [
                              {
                                  key: LOGIN,
                                  label: 'Login',
                              },
                          ]
                        : [
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
                          ]),
                ]}
            />
        </Layout.Header>
    );
}

export default Header;
