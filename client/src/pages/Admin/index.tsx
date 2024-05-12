import { Layout, Typography } from 'antd';
import AdminTabs from '../../components/Admin';

export default function Admin() {
    console.log('hello');
    return (
        <Layout>
            <Layout.Header>
                <Typography.Title level={1} style={{ color: 'white' }}>
                    Admin page
                </Typography.Title>
            </Layout.Header>
            <AdminTabs />
        </Layout>
    );
}
