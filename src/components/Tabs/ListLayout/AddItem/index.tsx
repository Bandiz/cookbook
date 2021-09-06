import { ChangeEvent, SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";

import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, TextField, Tooltip } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import "./AddItem.scss";

type AddItemProps = {
    categoryName?: string;
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    handleAddSubmit?: (event: SyntheticEvent<HTMLFormElement>) => void;
    url?: string;
};

function AddItem({ categoryName, handleChange, handleAddSubmit, url }: AddItemProps) {
    const history = useHistory();

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <IconButton
                        disabled={url ? false : categoryName !== "" ? false : true}
                        type={url ? "button" : "submit"}
                        onClick={() => url && history.push(url)}
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
