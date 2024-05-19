import { Button, Result, Spin } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HOME, LOGIN, replaceRouteParams } from '../../constants/routes';
import { useAuth } from '../../contexts/AuthContext';

export default function RouteGuard() {
    const { isLoading, isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (isLoading) {
        return <Spin fullscreen />;
    }

    const buttonText = isAuthenticated ? 'Back Home' : 'Login';

    if (!isAdmin || !isAuthenticated) {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate(
                                isAuthenticated
                                    ? HOME
                                    : replaceRouteParams(LOGIN, {}, { returnTo: encodeURIComponent(location.pathname) })
                            );
                        }}
                    >
                        {buttonText}
                    </Button>
                }
            />
        );
    }

    return <Outlet />;
}
