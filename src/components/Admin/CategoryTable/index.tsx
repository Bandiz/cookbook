import { useState } from 'react';
import { Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { useAdmin } from '../../../contexts/AdminContext';
import { CategoryRow } from './CategoryRow';
import { TableToolbar } from '../Shared/TableToolbar';
import { TableLoader } from '../Shared/TableLoader';
import { NewRow } from './NewRow';
import { useCategoryList } from '../../../api/categories';

export default function CategoriesTable() {
    const { categories } = useAdmin();
    const [isNew, setIsNew] = useState(false);
    const [isNewRowLoading, setIsNewRowLoading] = useState(false);
    const { isLoading } = useCategoryList();

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
                            <TableLoader loading={isLoading || isNewRowLoading} colSpan={6} />
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
