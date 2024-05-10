import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
    {
        key: '5',
        label: 'Data import/export',
        disabled: true,
    },
];

export default function AdminTabs() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get('activeTab') ?? '2');

    const queryKey = searchParams.get('activeTab');

    useEffect(() => {
        if (!queryKey) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.append('activeTab', activeTab);
            setSearchParams(newSearchParams);
        }

        if (queryKey && activeTab !== queryKey) {
            setActiveTab(queryKey);
        }
    }, [queryKey]);

    const handleTabChange = useCallback(
        (activeKey: string) => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('activeTab', activeKey);
            setSearchParams(newSearchParams);
            setActiveTab(activeKey);
        },
        [setActiveTab]
    );

    return (
        <AdminProvider>
            <Tabs defaultActiveKey={activeTab} items={items} style={{ padding: '0 20px' }} onChange={handleTabChange} />
        </AdminProvider>
    );
}
