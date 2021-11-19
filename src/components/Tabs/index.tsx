import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

import RecipesTable from './RecipesTable';
import CategoriesTable from './CategoriesTable';
import './Tabs.scss';
import { AdminProvider } from '../../contexts/AdminContext';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            className="tab-panel"
            {...other}
        >
            {value === index && (
                <Typography p={3} component="div" variant="body1">
                    {children}
                </Typography>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function AdminTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <AdminProvider>
            <section className="admin-tabs">
                <Box>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        className="tabs"
                        value={value}
                        onChange={handleChange}
                        aria-label="vertical tabs example"
                    >
                        <Tab label="Users" {...a11yProps(0)} />
                        <Tab label="Categories" {...a11yProps(1)} />
                        <Tab label="Recipes" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel index={0} value={value}>
                    List of Users, role change
                </TabPanel>
                <TabPanel index={1} value={value}>
                    List of all categories, Add/Delete/Edit? category
                    <CategoriesTable />
                </TabPanel>
                <TabPanel index={2} value={value}>
                    Add a new recipe, Link to Recipes
                    <RecipesTable />
                </TabPanel>
            </section>
        </AdminProvider>
    );
}
