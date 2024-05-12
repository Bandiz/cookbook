import { Layout, Typography } from 'antd';
import AdminTabs from '../../components/Admin';

export default function Admin() {
    return (
        <Layout>
            <Layout.Header>
                <Typography.Title level={1} style={{ color: 'white' }}>
                    Admin page
                </Typography.Title>
            </Layout.Header>
            <Layout.Content>
                <AdminTabs />
            </Layout.Content>
        </Layout>
    );
}
