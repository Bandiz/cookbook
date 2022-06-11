import { useState } from 'react';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export function Instructions() {
    const [fields, setFields] = useState([{ description: '' }]);

    const handleChangeInput = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const values = [...fields];
        values[index].description = event.target.value;
        setFields(values);
    };

    const handleAddFields = () => {
        const values = [...fields];
        values.push({ description: '' });
        setFields(values);
    };

    const handleRemoveFields = (index: number) => {
        const values = [...fields];
        values.splice(index, 1);
        setFields(values);
    };

    return (
        <Stack direction="column" spacing={1}>
            <Typography variant="subtitle1">Instructions</Typography>

            {fields.map((field, index) => {
                return (
                    <Stack key={`${field}-${index}`} direction="row">
                        <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            value={field.description}
                            onChange={(event) => handleChangeInput(index, event)}
                        />
                        <IconButton onClick={() => handleRemoveFields(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                );
            })}
            <Stack>
                <IconButton onClick={handleAddFields} sx={{ alignItems: 'center' }}>
                    <AddIcon />
                    <Typography variant="button">Add instruction</Typography>
                </IconButton>
            </Stack>
        </Stack>
    );
}
