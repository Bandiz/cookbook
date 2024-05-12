import { Button, Result, Spin } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { HOME } from '../../constants/routes';
import { useAuth } from '../../contexts/AuthContext';

export default function RouteGuard() {
    const { isLoading, isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();

    if (isLoading) {
        return <Spin fullscreen />;
    }

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
                            navigate(HOME);
                        }}
                    >
                        Back Home
                    </Button>
                }
            />
        );
    }

    return <Outlet />;
}
