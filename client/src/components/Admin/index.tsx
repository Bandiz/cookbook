import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import { AdminProvider } from '../../contexts/AdminContext';
import CategoryTable from './CategoryTable';
import RecipesTable from './RecipesTable';

export default function AdminTabs() {
    return (
        <AdminProvider>
            <Tabs defaultValue={1}>
                <TabList>
                    <Tab disabled>Users</Tab>
                    <Tab>Categories</Tab>
                    <Tab>Recipes</Tab>
                    <Tab disabled>Images</Tab>
                </TabList>
                <TabPanel value={1}>
                    <CategoryTable />
                </TabPanel>
                <TabPanel value={2}>
                    <RecipesTable />
                </TabPanel>
            </Tabs>
        </AdminProvider>
    );
}
