import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { FormEventHandler, useRef } from 'react';

interface NewRecipeDialogProps {
    open: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
}

export function NewRecipeDialog({ open, onClose, onConfirm }: NewRecipeDialogProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!formRef.current) {
            return;
        }
        const formData = new FormData(formRef.current);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">New Recipe</DialogTitle>
            <DialogContent>
                <DialogContentText component="section" id="alert-dialog-description">
                    <Box component="form" ref={formRef} onSubmit={onSubmit}>
                        <TextField label="Title" name="title" />
                        <Button type="submit">Submit</Button>
                    </Box>
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
