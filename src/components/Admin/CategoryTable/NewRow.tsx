import { useState, ChangeEvent, useEffect } from 'react';
import { TextField, TableRow, TableCell, IconButton, Tooltip, Checkbox } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { CreateCategory } from '../../../api/categories/createCategory';
import { Category } from '../../../types';

interface NewRowProps {
    onLoading: (isLoading: boolean) => void;
    onSave: (newRow: Category) => void;
    onCancel: () => void;
}

export function NewRow({ onLoading, onSave, onCancel }: NewRowProps) {
    const [newCategory, setNewCategory] = useState<string>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [newError, setNewError] = useState<string>();
    const { createCategoryRequest, createCategoryLoading } = CreateCategory();

    useEffect(() => {
        onLoading(createCategoryLoading);
    }, [createCategoryLoading]);

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

        onSave(response.payload);
    }

    function handleCancelNewCategory() {
        setNewCategory('');
        setNewError('');
        onCancel();
    }

    function handleOnVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
        setMenuVisible(event.target.checked);
    }

    return (
        <TableRow>
            <TableCell colSpan={2}>
                <TextField
                    variant="standard"
                    placeholder="Category name"
                    inputProps={{ 'aria-label': 'new category' }}
                    defaultValue={newCategory}
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
                        <IconButton color="primary" onClick={handleSaveNewCategory} disabled={createCategoryLoading}>
                            <SaveIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Cancel">
                    <span>
                        <IconButton color="error" onClick={handleCancelNewCategory} disabled={createCategoryLoading}>
                            <CancelIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}
