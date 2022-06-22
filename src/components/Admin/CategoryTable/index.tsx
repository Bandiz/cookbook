import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import { useCategoryList } from '../../../api/categories';
import useCreateCategoryMutation from '../../../api/categories/useCreateCategoryMutation';
import { TableLoader } from '../Shared/TableLoader';
import { TableToolbar } from '../Shared/TableToolbar';
import { CategoryRow } from './CategoryRow';
import { NewRow } from './NewRow';

export default function CategoriesTable() {
    const [isNew, setIsNew] = useState(false);
    const { isLoading: createCategoryLoading } = useCreateCategoryMutation();
    const { data: categories, isLoading } = useCategoryList();

    function handleOnSave() {
        setIsNew(false);
    }

    function handleOnCancel() {
        setIsNew(false);
    }

    return (
        <Grid item>
            <Paper>
                <TableToolbar
                    title="List of Categories"
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
                            <TableLoader loading={isLoading || createCategoryLoading} colSpan={6} />
                            {categories &&
                                categories.map((category, index) => (
                                    <CategoryRow
                                        key={`${category.categoryName}_${index}`}
                                        category={category}
                                        disabled={createCategoryLoading}
                                    />
                                ))}
                            {isNew && <NewRow onSave={handleOnSave} onCancel={handleOnCancel} />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
}
