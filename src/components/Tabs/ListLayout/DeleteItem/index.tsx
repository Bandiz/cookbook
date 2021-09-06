import { IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function DeleteItem() {
    return (
        <IconButton aria-label="delete">
            <Tooltip title="Delete">
                <DeleteIcon />
            </Tooltip>
        </IconButton>
    );
}
