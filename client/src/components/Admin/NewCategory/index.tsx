import { Alert, Checkbox, Col, Row, Spin, Table, TableColumnsType } from 'antd';
import { useCategoryList } from '../../../api/categories';
import { Category } from '../../../types';

const columns: TableColumnsType<Category> = [
    { title: 'Category name', dataIndex: 'categoryName' },
    {
        title: 'Is visible',
        dataIndex: 'visible',
        render: (value: boolean) => {
            return <Checkbox checked={value} disabled />;
        },
    },
    { title: 'Created by', dataIndex: 'createdBy' },
    { title: 'Updated by', dataIndex: 'updatedBy' },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
    },
];

export default function CategoriesTable() {
    const { data: categories, isLoading, isError } = useCategoryList();

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !categories) {
        return <Alert message="Failed to load recipes" type="error" />;
    }

    return (
        <Row justify="center" align="middle">
            <Col span={24}>
                <Table columns={columns} rowKey="categoryName" dataSource={categories} />;
            </Col>
        </Row>
    );
}
