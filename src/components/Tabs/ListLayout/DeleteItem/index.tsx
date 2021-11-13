import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteItem() {
    return (
        <IconButton aria-label="delete">
            <Tooltip title="Delete">
                <DeleteIcon />
            </Tooltip>
        </IconButton>
    );
}
