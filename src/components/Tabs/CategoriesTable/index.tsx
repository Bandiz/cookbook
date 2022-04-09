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
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

import { CreateCategory } from '../../../api/categories/createCategory';
import { useAdmin } from '../../../contexts/AdminContext';
import { GetCategoriesList } from '../../../api/categories/getCategoriesList';
import { CategoryRow } from './CategoryRow';
import { CategoryToolbar } from './CategoryToolbar';
import { TableLoader } from './TableLoader';

export default function CategoriesTable() {
    const { categories, setCategories, categoriesLoaded } = useAdmin();
    const [isNew, setIsNew] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const { getCategoriesRequest, getCategoriesLoading } = GetCategoriesList();
    const { createCategoryRequest, createCategoryLoading } = CreateCategory();

    useEffect(() => {
        if (categoriesLoaded) {
            return;
        }
        (async () => {
            const response = await getCategoriesRequest();
            if (response.type !== 'response') {
                return;
            }
            setCategories(response.payload);
        })();
    }, [categoriesLoaded]);

    function handleOnVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
        setMenuVisible(event.target.checked);
    }

    function NewRow() {
        const [newCategory, setNewCategory] = useState<string>();
        const [newError, setNewError] = useState<string>();

        function handleOnNewCategoryChange(event: ChangeEvent<HTMLInputElement>) {
            setNewCategory(event.target.value);
            if (newError) {
                setNewError('');
            }
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

        if (!isNew) {
            return null;
        }

        return (
            <TableRow>
                <TableCell colSpan={2}>
                    <TextField
                        variant="standard"
                        placeholder="Category name"
                        inputProps={{ 'aria-label': 'new category' }}
                        value={newCategory}
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
        );
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
                            <TableLoader loading={getCategoriesLoading || createCategoryLoading} colSpan={6} />
                            {categories.map((category) => (
                                <CategoryRow
                                    key={category.categoryName}
                                    category={category}
                                    disabled={createCategoryLoading}
                                />
                            ))}
                            <NewRow />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
}
