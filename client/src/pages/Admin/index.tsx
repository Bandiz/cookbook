import { Typography } from 'antd';
import { Navigate } from 'react-router-dom';
import AdminTabs from '../../components/Admin';
import { useAuth } from '../../contexts/AuthContext';

export default function Admin() {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="admin-page">
            <section className="admin-section">
                <Typography.Title level={4}>Admin page</Typography.Title>
            </section>
            <AdminTabs />
        </div>
    );
}
