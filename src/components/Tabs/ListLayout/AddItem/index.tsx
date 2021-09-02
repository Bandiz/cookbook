import { useHistory } from "react-router-dom";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { CREATE_RECIPE } from "../../../../constants/routes";

function AddItem({ text }: any) {
  const history = useHistory();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <IconButton onClick={() => history.push(CREATE_RECIPE)}>
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
