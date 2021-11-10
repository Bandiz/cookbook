import { useState } from 'react';

import {
    Grid,
    ListItemAvatar,
    ListItemText,
    List,
    ListItem,
    Avatar,
    Typography,
    ListItemSecondaryAction,
    TextField,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

import AddItem from '../ListLayout/AddItem';
import EditItem from '../ListLayout/EditItem';
import DeleteItem from '../ListLayout/DeleteItem';

export default function CategoriesTable() {
    const [categoryName, setCategoryName] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false);
    const [editedName, setEditedName] = useState<string>('Category name');

    const handleChange = (event: any) => {
        setCategoryName(event.target.value);
    };
    const handleAddSubmit = (event: any) => {
        event.preventDefault();
        console.log(categoryName);
        setCategoryName('');
    };

    const handleEdit = (event: any) => {
        setEdit(true);
        setEditedName(event.target.value);
        if (event.key === 'Enter') {
            handleEditSubmit(event);
        }
    };

    const handleEditSubmit = (event: any) => {
        event.preventDefault();
        console.log(editedName);
        setEdit(false);
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
                        {edit ? (
                            <div>
                                <form onSubmit={handleEditSubmit}>
                                    <TextField value={editedName} onChange={handleEdit} margin="normal" />
                                </form>
                            </div>
                        ) : (
                            <ListItemText primary={editedName} />
                        )}
                        <ListItemSecondaryAction>
                            <EditItem handleEdit={handleEdit} />
                            <DeleteItem />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </div>
        </Grid>
    );
}
