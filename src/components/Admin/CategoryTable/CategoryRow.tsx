import { ChangeEvent, useEffect, useState } from 'react';
import {
    Box,
    Checkbox,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { Category } from '../../../types';
import { UpdateCategoryVisibility } from '../../../api/categories/updateCategoryVisibility';
import { useAdmin } from '../../../contexts/AdminContext';
import { DeleteCategory } from '../../../api/categories/deleteCategory';
import { TableLoader } from '../Shared/TableLoader';
import { RemoveFromCategory } from '../../../api/recipes/removeFromCategory';
import { DeleteCategoryDialog } from './DeleteCategoryDialog';
import { useCategoryDetails } from '../../../api/categories';

interface CategoryRowProps {
    category: Category;
    disabled: boolean;
}

export function CategoryRow({ category, disabled }: CategoryRowProps) {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [visible, setVisible] = useState(category.visible);

    const { categories } = useAdmin();
    const { updateCategoryVisibilityRequest, updateCategoryVisibilityLoading } = UpdateCategoryVisibility();
    const { deleteCategoryRequest, deleteCategoryLoading } = DeleteCategory();

    // useEffect(() => {
    //     if (!open || typeof category.recipes !== 'undefined') {
    //         return;
    //     }
    //     (async () => {
    //         const response = await getCategoryDetailsRequest(category.categoryName);
    //         if (response.type === 'error') {
    //             return;
    //         }
    //         setCategories(
    //             categories.map((x) => {
    //                 if (x.categoryName === category.categoryName) {
    //                     return { ...x, recipes: response.payload.recipes };
    //                 }
    //                 return x;
    //             })
    //         );
    //     })();
    // }, [open, category]);

    useEffect(() => {
        if (editMode && open) {
            setOpen(false);
        }
    }, [editMode, open]);

    function handleOnVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
        setVisible(event.target.checked);
    }

    async function handleOnSaveClick() {
        const response = await updateCategoryVisibilityRequest(category.categoryName, visible);
        if (response.type === 'error') {
            return;
        }
        setEditMode(false);
        setCategories((prev) =>
            prev.map((x) => {
                if (x.categoryName === category.categoryName) {
                    return response.payload;
                }
                return x;
            })
        );
    }

    function EditMode() {
        return (
            <>
                <TableCell colSpan={2} scope="row">
                    {category.categoryName}
                </TableCell>
                <TableCell colSpan={3} scope="row">
                    <Checkbox
                        checked={visible}
                        onChange={handleOnVisibilityChange}
                        inputProps={{ 'aria-label': 'is menu visible' }}
                    />
                </TableCell>
                <TableCell align="right">
                    <Tooltip title="Save">
                        <span>
                            <IconButton
                                disabled={disabled || updateCategoryVisibilityLoading}
                                onClick={handleOnSaveClick}
                            >
                                <SaveIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <span>
                            <IconButton
                                disabled={disabled || updateCategoryVisibilityLoading}
                                onClick={() => setEditMode(false)}
                            >
                                <CancelIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </TableCell>
            </>
        );
    }

    function DisplayMode() {
        const [deleteOpen, setDeleteOpen] = useState(false);

        function handleOnDialogClose() {
            setDeleteOpen(false);
        }

        async function handleOnConfirmDeletion() {
            handleOnDialogClose();
            await deleteCategoryRequest(category.categoryName);
            setCategories(categories.filter((x) => x.categoryName !== category.categoryName));
        }

        return (
            <>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell scope="row">{category.categoryName}</TableCell>
                <TableCell scope="row">
                    <Checkbox checked={category.visible} disabled inputProps={{ 'aria-label': 'is menu visible' }} />
                </TableCell>
                <TableCell scope="row">
                    <Tooltip title={category.createdAt.format('YYYY-DD-MM HH:mm')} arrow>
                        <span>{category.createdBy}</span>
                    </Tooltip>
                </TableCell>
                <TableCell scope="row">
                    <Tooltip title={category.updatedAt?.format('YYYY-DD-MM HH:mm') ?? ''} arrow>
                        <span>{category.updatedBy}</span>
                    </Tooltip>
                </TableCell>
                <TableCell align="right">
                    <Tooltip title="Edit">
                        <span>
                            <IconButton disabled={disabled || deleteCategoryLoading} onClick={() => setEditMode(true)}>
                                <EditIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <span>
                            <IconButton
                                disabled={disabled || deleteCategoryLoading}
                                onClick={() => setDeleteOpen(true)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <DeleteCategoryDialog
                        category={category}
                        open={deleteOpen}
                        onClose={handleOnDialogClose}
                        onConfirm={handleOnConfirmDeletion}
                    />
                </TableCell>
            </>
        );
    }

    function CategoryRowDetail() {
        const { data: details, isLoading } = useCategoryDetails(category.categoryName, open);

        const { removeFromCategoryRequest, removeFromCategoryLoading } = RemoveFromCategory();

        async function handleOnRemoveFromRecipeClick(recipeId: string) {
            const response = await removeFromCategoryRequest(recipeId, category.categoryName);

            if (response.type === 'error') {
                console.error(response.error);
                return;
            }
            setCategories((prev) => [
                ...prev.map((x) => {
                    if (x.categoryName === category.categoryName) {
                        x.recipes = x.recipes?.filter((y) => y.id !== recipeId);
                    }
                    return x;
                }),
            ]);
        }

        if (!details) {
            return null;
        }

        return (
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Recipes
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Created by</TableCell>
                                        <TableCell>Updated by</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableLoader loading={isLoading || removeFromCategoryLoading} colSpan={4} />
                                    {details.recipes.map((x) => (
                                        <TableRow key={x.id}>
                                            <TableCell scope="row">{x.title}</TableCell>
                                            <TableCell scope="row">
                                                <Tooltip title={x.createdAt.format('YYYY-DD-MM HH:mm')} arrow>
                                                    <span>{x.createdBy}</span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell scope="row">
                                                <Tooltip title={x.updatedAt?.format('YYYY-DD-MM HH:mm') ?? ''} arrow>
                                                    <span>{x.updatedBy}</span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Remove">
                                                    <span>
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => {
                                                                handleOnRemoveFromRecipeClick(x.id);
                                                            }}
                                                        >
                                                            <RemoveCircleIcon />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset !important' } }}>
                {editMode ? <EditMode /> : <DisplayMode />}
            </TableRow>
            <CategoryRowDetail />
        </>
    );
}
