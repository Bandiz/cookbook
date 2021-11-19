import { useState, ChangeEvent } from 'react';

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
import { useGlobalContext } from '../../../contexts/RecipesContext';
import { CreateCategory } from '../../../api/categories/createCategory';

export default function CategoriesTable() {
    const { categories, getCategoriesLoading } = useGlobalContext();
    const [isNew, setIsNew] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const { createCategoryRequest, createCategoryLoading } = CreateCategory();

    function handleOnNewCategoryChange(event: ChangeEvent<HTMLInputElement>) {
        setNewCategory(event.target.value);
    }

    function handleSaveNewCategory() {
        setIsNew(false);
        createCategoryRequest(newCategory);
    }

    function handleCancelNewCategory() {
        setIsNew(false);
        setNewCategory('');
    }

    function CategoryRow(props: { category: string }) {
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
                        {category}
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
                {isNew && (
                    <IconButton disabled={true}>
                        <AddCircleIcon />
                    </IconButton>
                )}
                {!isNew && (
                    <Tooltip title="Add">
                        <IconButton
                            onClick={() => {
                                setIsNew(true);
                            }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Tooltip>
                )}
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
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(getCategoriesLoading || createCategoryLoading) && (
                                <TableRow>
                                    <TableCell
                                        colSpan={2}
                                        sx={{
                                            p: 0,
                                        }}
                                    >
                                        <LinearProgress />
                                    </TableCell>
                                </TableRow>
                            )}
                            {categories.map((category) => (
                                <CategoryRow key={category} category={category} />
                            ))}
                            {isNew && (
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <TextField
                                            variant="standard"
                                            placeholder="Category name"
                                            inputProps={{ 'aria-label': 'new category' }}
                                            onChange={handleOnNewCategoryChange}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Save">
                                            <IconButton color="primary" onClick={handleSaveNewCategory}>
                                                <SaveIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Cancel">
                                            <IconButton color="error" onClick={handleCancelNewCategory}>
                                                <CancelIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* <div style={{ backgroundColor: 'var(--darkGrey)' }}> */}

            {/* <List>
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
                </List> */}
            {/* </div> */}
        </Grid>
    );
}
