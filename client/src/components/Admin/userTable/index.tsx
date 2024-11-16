import { Alert, Checkbox, Space, Spin, Table, TableColumnsType, Tag } from 'antd';
import { UserResponse } from '../../../api/admin/user/types';
import useUserList from '../../../api/admin/user/useUserList';
import EditUserAction from './EditUserAction';

const columns: TableColumnsType<UserResponse> = [
    { title: 'Name', dataIndex: 'name' },
    {
        title: 'Last name',
        dataIndex: 'lastName',
    },
    {
        title: 'Roles',
        dataIndex: 'roles',
        render: (value: string[]) =>
            value.map((role) => (
                <Tag key={role} color="blue">
                    {role}
                </Tag>
            )),
    },
    { title: 'Username', dataIndex: 'userName' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Lockout End', dataIndex: 'lockoutEnd' },
    {
        title: 'Can be locked out',
        dataIndex: 'lockoutEnabled',
        render: (value: boolean) => {
            return <Checkbox checked={value} disabled />;
        },
    },
    {
        title: 'Failed login attempts',
        dataIndex: 'accessFailedCount',
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (_, record) => (
            <Space size="small" direction="horizontal">
                <EditUserAction id={record.id} />
            </Space>
        ),
    },
];

export default function UserTable() {
    const { data, isLoading, isError } = useUserList();

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !data) {
        return <Alert message="Failed to load users" type="error" />;
    }

    return <Table columns={columns} rowKey="id" dataSource={data.data.users} />;
}
