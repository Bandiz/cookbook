import { useState, ChangeEvent, useEffect } from 'react';

import {
    TextField,
    Grid,
    // ListItemAvatar,
    // List,
    // ListItem,
    // Avatar,
    Typography,
    // ListItemSecondaryAction,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Toolbar,
    Tooltip,
} from '@mui/material';
// import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LinearProgress from '@mui/material/LinearProgress';

import AddItem from '../ListLayout/AddItem';
import DeleteItem from '../ListLayout/DeleteItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { CreateCategory } from '../../../api/categories/createCategory';
import { useAdmin } from '../../../contexts/AdminContext';
import { GetCategoriesList } from '../../../api/categories/getCategoriesList';
import { Category } from '../../../types';

export default function CategoriesTable() {
    const { categories, setCategories } = useAdmin();
    const [isNew, setIsNew] = useState(false);
    const [newError, setNewError] = useState<string>();
    const [newCategory, setNewCategory] = useState('');

    const { getCategoriesRequest, getCategoriesLoading } = GetCategoriesList();
    const { createCategoryRequest, createCategoryLoading } = CreateCategory();

    useEffect(() => {
        if (categories.length > 0) {
            return;
        }
        getCategoriesRequest().then((response) => {
            if (response.type === 'response') {
                setCategories(response.payload);
            }
        });
    }, [categories]);

    function handleOnNewCategoryChange(event: ChangeEvent<HTMLInputElement>) {
        setNewCategory(event.target.value);
        if (newError) {
            setNewError('');
        }
    }

    async function handleSaveNewCategory() {
        const response = await createCategoryRequest(newCategory);
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

    function CategoryRow(props: { category: Category }) {
        const { category } = props;
        const [open, setOpen] = useState(false);

        return (
            <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {category.categoryName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {category.createdBy}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {category.createdAt.format('YYYY-DD-MM HH:mm')}
                    </TableCell>
                    <TableCell align="right">
                        <DeleteItem />
                    </TableCell>
                </TableRow>
                {/* <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    History
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Total price ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.date}
                                                </TableCell>
                                                <TableCell>{historyRow.customerId}</TableCell>
                                                <TableCell align="right">{historyRow.amount}</TableCell>
                                                <TableCell align="right">
                                                    {Math.round(historyRow.amount * row.price * 100) / 100}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow> */}
            </>
        );
    }

    function EnhancedTableToolbar() {
        return (
            <Toolbar>
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    List of Categories
                </Typography>
                <Tooltip title="Add">
                    <span>
                        <IconButton
                            disabled={isNew}
                            onClick={() => {
                                setIsNew(true);
                            }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </Toolbar>
        );
    }

    return (
        <Grid item>
            <Paper>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Category name</TableCell>
                                <TableCell>Created by</TableCell>
                                <TableCell>Created at</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(getCategoriesLoading || createCategoryLoading) && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        sx={{
                                            p: 0,
                                        }}
                                    >
                                        <LinearProgress />
                                    </TableCell>
                                </TableRow>
                            )}
                            {categories.map((category) => (
                                <CategoryRow key={category.categoryName} category={category} />
                            ))}
                            {isNew && (
                                <TableRow>
                                    <TableCell colSpan={4}>
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
