import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Category } from '../../../types';

interface DeleteCategoryDialogProps {
    category: Category;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteCategoryDialog({ category, open, onClose, onConfirm }: DeleteCategoryDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Do you want to delete <strong>{category.categoryName}</strong>?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    By deleting this category, you will remove if from all the recipes that use it.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose} autoFocus>
                    Cancel
                </Button>
                <Button variant="contained" color="error" onClick={onConfirm}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
