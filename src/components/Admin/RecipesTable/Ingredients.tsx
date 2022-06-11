import { useState } from 'react';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export function Ingredients() {
    const [fields, setFields] = useState([{ amount: 0, measurementType: '', name: '' }]);

    const handleChangeInput = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const values = [...fields];
        if (event.target.name === 'amount') {
            values[index].amount = Number(event.target.value);
        }
        if (event.target.name === 'measurementType') {
            values[index].measurementType = event.target.value;
        }
        if (event.target.name === 'name') {
            values[index].name = event.target.value;
        }
        setFields(values);
    };

    const handleAddFields = () => {
        const values = [...fields];
        values.push({ amount: 0, measurementType: '', name: '' });
        setFields(values);
    };

    const handleRemoveFields = (index: number) => {
        const values = [...fields];
        values.splice(index, 1);
        setFields(values);
    };

    return (
        <Stack direction="column" spacing={1}>
            <Typography variant="subtitle1">Ingredients</Typography>

            {fields.map((field, index) => {
                return (
                    <Stack key={`${field}-${index}`} direction="row" spacing={1}>
                        <TextField
                            sx={{ width: '70px' }}
                            type="number"
                            name="amount"
                            label="Amount"
                            variant="outlined"
                            value={field.amount}
                            onChange={(event) => handleChangeInput(index, event)}
                        />
                        <TextField
                            name="measurementType"
                            label="Measurement Type"
                            variant="outlined"
                            value={field.measurementType}
                            onChange={(event) => handleChangeInput(index, event)}
                        />
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            value={field.name}
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
                    <Typography variant="button">Add ingredient</Typography>
                </IconButton>
            </Stack>
        </Stack>
    );
}
