import { Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import AdminTabs from '../../components/Tabs';
import { useAuth } from '../../contexts/AuthContext';
import './Admin.scss';

export default function Admin() {
    const { user } = useAuth();

    if (!user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="admin-page">
            <section className="admin-section">
                <Typography variant="h4">Admin page</Typography>
            </section>
            <AdminTabs />
        </div>
    );
}
