import { useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuProps } from 'antd';

// import Navbar from './Navbar';
import { useAuth } from '../../../contexts/AuthContext';
import { ABOUT, ADMIN, HOME, LOGIN, RECIPES } from '../../../constants/routes';
import { useLogoutSessionMutation } from '../../../api/session';

function Header() {
    const navigate = useNavigate();
    // const location = useLocation();
    const logoutSessionMutation = useLogoutSessionMutation();
    const { isAuthenticated } = useAuth();
    // const [current, setCurrent] = useState(location.pathname);
    const { user, isAdmin } = useAuth();

    const onClick: MenuProps['onClick'] = (e) => {
        // setCurrent(e.key);

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
        <>
            {/* <Navbar /> */}
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ flex: 1, minWidth: 0 }}
                // selectedKeys={[current]}
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
                                          icon={user?.name.slice(0, 1).toUpperCase()}
                                          style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
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
        </>
    );
}

export default Header;
