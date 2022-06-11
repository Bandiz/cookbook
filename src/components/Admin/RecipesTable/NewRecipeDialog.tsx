import { FormEventHandler, useRef, useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import { useRecipes } from '../../../contexts/RecipesContext';
import { Instructions } from './Instructions';
import { Ingredients } from './Ingredients';

interface NewRecipeDialogProps {
    open: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
}

export function NewRecipeDialog({ open, onClose, onConfirm }: NewRecipeDialogProps) {
    const { categories } = useRecipes();
    const [category, setCategory] = useState<string[]>([]);

    const formRef = useRef<HTMLFormElement>(null);
    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!formRef.current) {
            return;
        }
        const formData = new FormData(formRef.current);

        for (const a of category) {
            formData.append('categories', a);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">New Recipe</DialogTitle>
            <DialogContent>
                <DialogContentText component="section" id="alert-dialog-description">
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}
                        component="form"
                        ref={formRef}
                        onSubmit={onSubmit}
                    >
                        <TextField required label="Title" name="title" />

                        <Autocomplete
                            freeSolo
                            multiple
                            value={category}
                            onChange={(event, newValue) => {
                                setCategory(newValue);
                            }}
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            options={categories}
                            renderInput={(params) => {
                                return <TextField {...params} variant="outlined" label="Categories" />;
                            }}
                        />

                        <TextField fullWidth label="Image" name="imageUrl" />

                        <Stack alignItems="center" direction="row" spacing={1} justifyContent="center">
                            <TextField fullWidth type="number" label="Total Time minutes" name="totalTimeMinutes" />
                            <TextField fullWidth type="number" label="Prep Time minutes" name="prepTimeMinutes" />
                            <TextField fullWidth type="number" label="Cook Time minutes" name="cookTimeMinutes" />
                        </Stack>

                        <TextField multiline label="Description" name="description" />

                        <Stack direction="row" spacing={1} justifyContent="flex-start">
                            <Ingredients />
                            <Instructions />
                        </Stack>

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
