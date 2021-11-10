import { useNavigate } from 'react-router-dom';

import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, TextField, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import './AddItem.scss';

type AddItemProps = {
    categoryName?: string;
    handleChange?: (event: any) => void;
    handleAddSubmit?: (event: any) => void;
    url?: any;
};

function AddItem({ categoryName, handleChange, handleAddSubmit, url }: AddItemProps) {
    const navigate = useNavigate();

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <IconButton
                        disabled={url ? false : categoryName !== '' ? false : true}
                        type={url ? 'button' : 'submit'}
                        onClick={() => url && navigate(url)}
                        className="button"
                    >
                        <Tooltip title="Add">
                            <AddCircleIcon className="icon" />
                        </Tooltip>
                    </IconButton>
                </Avatar>
            </ListItemAvatar>
            {url ? (
                <ListItemText primary={`Add a new recipe`} />
            ) : (
                <form onSubmit={handleAddSubmit}>
                    <TextField
                        className="text-field"
                        label="Add a new category"
                        value={categoryName}
                        onInput={handleChange}
                        margin="normal"
                    />
                </form>
            )}
        </ListItem>
    );
}

export default AddItem;
