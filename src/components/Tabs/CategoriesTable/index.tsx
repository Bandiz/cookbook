import {
  Grid,
  ListItemAvatar,
  ListItemText,
  List,
  ListItem,
  Avatar,
  Typography,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";

import AddItem from "../ListLayout/AddItem";
import ListItems from "../ListLayout";

export default function CategoriesTable() {
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6" className="title">
        List of Categories
      </Typography>
      <div style={{ backgroundColor: "var(--darkGrey)" }}>
        <List>
          <AddItem text="category" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Category name" />
            <ListItems />
          </ListItem>
        </List>
      </div>
    </Grid>
  );
}
