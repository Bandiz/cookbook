import { useState, useEffect } from 'react';
import { Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { useAdmin } from '../../../contexts/AdminContext';
import { GetCategoriesList } from '../../../api/categories/getCategoriesList';
import { CategoryRow } from './CategoryRow';
import { CategoryToolbar } from './CategoryToolbar';
import { TableLoader } from '../Shared/TableLoader';
import { Category } from '../../../types';
import { NewRow } from './NewRow';

export default function CategoriesTable() {
    const { categories, setCategories, categoriesLoaded } = useAdmin();
    const [isNew, setIsNew] = useState(false);
    const { getCategoriesRequest, getCategoriesLoading } = GetCategoriesList();
    const [isNewRowLoading, setIsNewRowLoading] = useState(false);

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

    function handleOnSave(newCategory: Category) {
        setIsNew(false);
        setCategories([...categories, newCategory]);
    }

    function handleOnCancel() {
        setIsNew(false);
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
                            <TableLoader loading={getCategoriesLoading || isNewRowLoading} colSpan={6} />
                            {categories.map((category) => (
                                <CategoryRow
                                    key={category.categoryName}
                                    category={category}
                                    disabled={isNewRowLoading}
                                />
                            ))}
                            {isNew && (
                                <NewRow
                                    onLoading={setIsNewRowLoading}
                                    onSave={handleOnSave}
                                    onCancel={handleOnCancel}
                                />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
}
