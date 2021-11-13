import { ChangeEvent, SyntheticEvent, useState } from 'react';

import { Grid, ListItemAvatar, List, ListItem, Avatar, Typography, ListItemSecondaryAction } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';

import AddItem from '../ListLayout/AddItem';
import DeleteItem from '../ListLayout/DeleteItem';

export default function CategoriesTable() {
    const [categoryName, setCategoryName] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
    };
    const handleAddSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(categoryName);
        setCategoryName('');
    };

    return (
        <Grid item xs={12} md={6}>
            <Typography variant="h6" className="title">
                List of Categories
            </Typography>
            <div style={{ backgroundColor: 'var(--darkGrey)' }}>
                <List>
                    <AddItem
                        handleAddSubmit={handleAddSubmit}
                        handleChange={handleChange}
                        categoryName={categoryName}
                    />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemSecondaryAction>
                            <DeleteItem />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </div>
        </Grid>
    );
}
