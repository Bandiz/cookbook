import { Typography } from 'antd';
import AdminTabs from '../../components/Admin';

export default function Admin() {
    return (
        <div className="admin-page">
            <section className="admin-section">
                <Typography.Title level={4}>Admin page</Typography.Title>
            </section>
            <AdminTabs />
        </div>
    );
}
