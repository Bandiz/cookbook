import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface CategoryToolbarProps {
    onNewClick: () => void;
    disabled: boolean;
}

export function CategoryToolbar({ onNewClick, disabled }: CategoryToolbarProps) {
    return (
        <Toolbar>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                List of Categories
            </Typography>
            <Tooltip title="Add">
                <span>
                    <IconButton disabled={disabled} onClick={onNewClick}>
                        <AddCircleIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </Toolbar>
    );
}
