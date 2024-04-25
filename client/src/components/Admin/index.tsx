import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { AdminProvider } from '../../contexts/AdminContext';
import CategoryTable from './CategoryTable';
import RecipesTable from './RecipesTable';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Users',
        disabled: true,
    },
    {
        key: '2',
        label: 'Categories',
        children: <CategoryTable />,
    },
    {
        key: '3',
        label: 'Recipes',
        children: <RecipesTable />,
    },
    {
        key: '4',
        label: 'Images',
        disabled: true,
    },
];

export default function AdminTabs() {
    return (
        <AdminProvider>
            <Tabs defaultActiveKey="2" items={items} style={{ padding: '0 20px' }} />
        </AdminProvider>
    );
}
