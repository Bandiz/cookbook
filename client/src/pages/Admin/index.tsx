import { Typography } from '@mui/joy';
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
                <Typography level="h4">Admin page</Typography>
            </section>
            <AdminTabs />
        </div>
    );
}
