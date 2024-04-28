import { useState } from 'react';
import { Menu, MenuProps } from 'antd';

import Navbar from './Navbar';
import { useAuth } from '../../../contexts/AuthContext';

function Header() {
    const { isAuthenticated } = useAuth();
    const [current, setCurrent] = useState('Home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            <Navbar />
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ flex: 1, minWidth: 0 }}
                selectedKeys={[current]}
                onClick={onClick}
                items={[
                    {
                        key: '1',
                        label: 'Home',
                    },
                    {
                        key: '2',
                        label: 'Recipes',
                    },
                    {
                        key: '3',
                        label: 'About',
                    },
                    ...(isAuthenticated
                        ? [
                              {
                                  key: '4',
                                  label: 'Login',
                                  children: [
                                      { label: 'Admin', key: 'admin' },
                                      { label: 'Logout', key: 'logout' },
                                  ],
                              },
                          ]
                        : [
                              {
                                  key: '4',
                                  label: 'Login',
                              },
                          ]),
                ]}
            />
        </>
    );
}

export default Header;
