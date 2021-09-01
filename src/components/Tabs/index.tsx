import { useState } from "react";
import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";

import RecipesTable from "./RecipesTable";
import CategoriesTable from "./CategoriesTable";
import "./Tabs.scss";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function AdminTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="admin-tabs">
      <AppBar position="static" color="default">
        <Tabs
          className="tabs"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Categories" {...a11yProps(1)} />
          <Tab label="Recipes" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
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
    </div>
  );
}
