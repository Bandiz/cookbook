import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function AddItem({ text }: any) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <IconButton>
            <Tooltip title="Add">
              <AddCircleIcon style={{ fontSize: 30 }} />
            </Tooltip>
          </IconButton>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`Add a new ${text}`} />
    </ListItem>
  );
}

export default AddItem;
