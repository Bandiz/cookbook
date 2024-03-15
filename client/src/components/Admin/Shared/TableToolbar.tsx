import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface TableToolbarProps {
    title: string;
    disabled: boolean;
    onNewClick: () => void;
}

export function TableToolbar({ title, disabled, onNewClick }: TableToolbarProps) {
    return (
        <Toolbar>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                {title}
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
