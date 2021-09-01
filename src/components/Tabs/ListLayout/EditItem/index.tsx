import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

export default function EditItem() {
  return (
    <IconButton aria-label="edit">
      <Tooltip title="Edit">
        <EditIcon />
      </Tooltip>
    </IconButton>
  );
}
