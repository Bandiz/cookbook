import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTable from './CategoryTable';
import RecipesTable from './RecipesTable';
import UserTable from './userTable';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Users',
        children: <UserTable />,
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

const defaultActiveTab = items.find((x) => !x.disabled)?.key ?? '2';

export default function AdminTabs() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get('activeTab') ?? defaultActiveTab);

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

    return <Tabs defaultActiveKey={activeTab} items={items} style={{ padding: '0 20px' }} onChange={handleTabChange} />;
}
