import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

type EditProps = {
  handleEdit?: (event: any) => void;
};

export default function EditItem({ handleEdit }: EditProps) {
  return (
    <IconButton aria-label="edit" onClick={handleEdit}>
      <Tooltip title="Edit">
        <EditIcon />
      </Tooltip>
    </IconButton>
  );
}
