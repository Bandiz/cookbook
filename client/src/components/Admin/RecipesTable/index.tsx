import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar,
    Checkbox,
    Fab,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { useRecipes } from '../../../api/recipes';
import { TableLoader } from '../Shared/TableLoader';
import { NewRecipeDialog } from './NewRecipeDialog';

export default function RecipesTable() {
    const [newRecipeDialogOpen, setNewRecipeDialogOpen] = useState(false);
    const { data, isLoading } = useRecipes();

    return (
        <Grid item>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Title</TableCell>
                                <TableCell>Published</TableCell>
                                <TableCell>Total time</TableCell>
                                <TableCell>Created by</TableCell>
                                <TableCell>Updated by</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableLoader loading={isLoading} colSpan={7} />
                            {data &&
                                data.map((recipe) => (
                                    <TableRow key={recipe.id}>
                                        <TableCell>
                                            <Avatar variant="square" />
                                        </TableCell>
                                        <TableCell>{recipe.title}</TableCell>
                                        <TableCell>
                                            <Checkbox checked={recipe.isPublished} disabled />
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip
                                                title={`Prep time ${
                                                    recipe.prepTimeMinutes ?? 0
                                                } minutes and cook time ${recipe.cookTimeMinutes ?? 0} minutes`}
                                                arrow
                                            >
                                                <span>{recipe.totalTimeMinutes}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={recipe.createdAt.format('YYYY-DD-MM HH:mm')} arrow>
                                                <span>{recipe.createdBy}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={recipe.updatedAt?.format('YYYY-DD-MM HH:mm') ?? ''} arrow>
                                                <span>{recipe.updatedBy}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Edit">
                                                <span>
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <span>
                                                    <IconButton>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <NewRecipeDialog open={newRecipeDialogOpen} onClose={() => setNewRecipeDialogOpen(false)} />
            </Paper>
            <Fab
                size="medium"
                color="primary"
                aria-label="add"
                sx={{ float: 'right', marginTop: (d) => d.spacing(2) }}
                onClick={() => setNewRecipeDialogOpen(true)}
            >
                <AddIcon />
            </Fab>
        </Grid>
    );
}
