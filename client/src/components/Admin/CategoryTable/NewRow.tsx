import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { Checkbox, IconButton, TableCell, TableRow, TextField, Tooltip } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useCreateCategoryMutation } from '../../../api/categories';

interface NewRowProps {
    onSave: () => void;
    onCancel: () => void;
}

export function NewRow({ onSave, onCancel }: NewRowProps) {
    const [newCategory, setNewCategory] = useState<string>();
    const [menuVisible, setMenuVisible] = useState(false);
    const { mutateAsync, isLoading, isError, error } = useCreateCategoryMutation();

    function handleOnNewCategoryChange(event: ChangeEvent<HTMLInputElement>) {
        setNewCategory(event.target.value);
    }

    async function handleSaveNewCategory() {
        if (!newCategory) {
            return;
        }

        await mutateAsync({ categoryName: newCategory, visible: menuVisible });

        onSave();
    }

    function handleCancelNewCategory() {
        setNewCategory('');
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
                    error={isError}
                    helperText={error?.response?.data}
                    disabled={isLoading}
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
                        <IconButton color="primary" onClick={handleSaveNewCategory} disabled={isLoading}>
                            <SaveIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Cancel">
                    <span>
                        <IconButton color="error" onClick={handleCancelNewCategory} disabled={isLoading}>
                            <CancelIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}
