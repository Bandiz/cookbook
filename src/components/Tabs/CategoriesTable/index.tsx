import { useState, ChangeEvent, useEffect } from 'react';

import {
    TextField,
    Grid,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip,
    Checkbox,
} from '@mui/material';

import LinearProgress from '@mui/material/LinearProgress';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { CreateCategory } from '../../../api/categories/createCategory';
import { useAdmin } from '../../../contexts/AdminContext';
import { GetCategoriesList } from '../../../api/categories/getCategoriesList';
import { CategoryRow } from './CategoryRow';
import { CategoryToolbar } from './CategoryToolbar';

export default function CategoriesTable() {
    const { categories, setCategories } = useAdmin();
    const [isNew, setIsNew] = useState(false);
    const [newError, setNewError] = useState<string>();
    const [newCategory, setNewCategory] = useState<string>();
    const [menuVisible, setMenuVisible] = useState(false);

    const { getCategoriesRequest, getCategoriesLoading } = GetCategoriesList();
    const { createCategoryRequest, createCategoryLoading } = CreateCategory();

    useEffect(() => {
        getCategoriesRequest().then((response) => {
            if (response.type === 'response') {
                setCategories(response.payload);
            }
        });
    }, []);

    function handleOnNewCategoryChange(event: ChangeEvent<HTMLInputElement>) {
        setNewCategory(event.target.value);
        if (newError) {
            setNewError('');
        }
    }

    function handleOnVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
        setMenuVisible(event.target.checked);
    }

    async function handleSaveNewCategory() {
        if (!newCategory) {
            return;
        }

        const response = await createCategoryRequest(newCategory, menuVisible);
        if (response.type === 'error') {
            setNewError(response.error);
            return;
        }
        setIsNew(false);
        setCategories([...categories, response.payload]);
    }

    function handleCancelNewCategory() {
        setIsNew(false);
        setNewCategory('');
        setNewError('');
    }

    return (
        <Grid item>
            <Paper>
                <CategoryToolbar
                    disabled={isNew}
                    onNewClick={() => {
                        setIsNew(true);
                    }}
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Category name</TableCell>
                                <TableCell>Visible</TableCell>
                                <TableCell>Created by</TableCell>
                                <TableCell>Updated by</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(getCategoriesLoading || createCategoryLoading) && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        sx={{
                                            p: 0,
                                        }}
                                    >
                                        <LinearProgress />
                                    </TableCell>
                                </TableRow>
                            )}
                            {categories.map((category) => (
                                <CategoryRow
                                    key={category.categoryName}
                                    category={category}
                                    disabled={createCategoryLoading}
                                />
                            ))}
                            {isNew && (
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <TextField
                                            variant="standard"
                                            placeholder="Category name"
                                            inputProps={{ 'aria-label': 'new category' }}
                                            onChange={handleOnNewCategoryChange}
                                            error={Boolean(newError)}
                                            helperText={newError}
                                            disabled={createCategoryLoading}
                                        />
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <Checkbox
                                            checked={menuVisible}
                                            onChange={handleOnVisibilityChange}
                                            inputProps={{ 'aria-label': 'is menu visible' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Save">
                                            <span>
                                                <IconButton
                                                    color="primary"
                                                    onClick={handleSaveNewCategory}
                                                    disabled={createCategoryLoading}
                                                >
                                                    <SaveIcon />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Tooltip title="Cancel">
                                            <span>
                                                <IconButton
                                                    color="error"
                                                    onClick={handleCancelNewCategory}
                                                    disabled={createCategoryLoading}
                                                >
                                                    <CancelIcon />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
}
