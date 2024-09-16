import { Alert, Checkbox, Space, Spin, Table, TableColumnsType, Tag } from 'antd';
import { UserResponse } from '../../../api/user/types';
import useUserList from '../../../api/user/useUserList';

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
        title: 'Failed attempts',
        dataIndex: 'accessFailedCount',
    },
    // {
    //     title: 'Action',
    //     dataIndex: '',
    //     key: 'x',
    //     render: (_, record) => (
    //         <Space size="small" direction="horizontal">
    //             <EditCategoryAction categoryName={record.categoryName} />
    //             <DeleteCategoryAction categoryName={record.categoryName} />
    //         </Space>
    //     ),
    // },
];

export default function UserTable() {
    const { data, isLoading, isError } = useUserList();

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !data) {
        return <Alert message="Failed to load users" type="error" />;
    }

    return <Table columns={columns} rowKey="userName" dataSource={data.data.users} />;
}
