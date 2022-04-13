import { useEffect } from 'react';
import {
    Avatar,
    Checkbox,
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAdmin } from '../../../contexts/AdminContext';
import { GetRecipes } from '../../../api/recipes/getRecipes';
import { TableLoader } from '../Shared/TableLoader';

export default function RecipesTable() {
    const { recipes, setRecipes, recipesLoaded } = useAdmin();
    const { getRecipesRequest, getRecipesLoading } = GetRecipes();

    useEffect(() => {
        if (recipesLoaded) {
            return;
        }
        (async () => {
            const response = await getRecipesRequest();
            if (response.type !== 'response') {
                return;
            }
            setRecipes(response.payload);
        })();
    }, [recipesLoaded]);

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
                            <TableLoader loading={getRecipesLoading} colSpan={7} />
                            {recipes.map((recipe) => (
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
                                            title={`Prep time ${recipe.prepTimeMinutes ?? 0} minutes and cook time ${
                                                recipe.cookTimeMinutes ?? 0
                                            } minutes`}
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
            </Paper>
        </Grid>
    );
}
