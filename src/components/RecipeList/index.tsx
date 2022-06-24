import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, CardHeader, CardMedia, Chip, Fab, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Recipe } from '../../types';
import { useStyles } from './RecipeList';

interface RecipeListProps {
    recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
    const { isAdmin } = useAuth();
    const { classes } = useStyles();

    if (!recipes || recipes.length < 1) {
        return <h2 className="section-title">No recipes to display</h2>;
    }
    return (
        <div className={classes.recipes}>
            {recipes.map((recipe: Recipe, index) => {
                const { title, id, imageUrl, categories, totalTimeMinutes } = recipe;
                return (
                    <Card key={index} className={classes.item}>
                        <Link to={`/recipe/${id}`}>
                            <CardMedia component="img" src={imageUrl} alt={title} className={classes.image} />
                            <CardHeader title={title} align="center" titleTypographyProps={{ variant: 'h6' }} />
                        </Link>
                        <CardContent sx={{ pt: 0 }}>
                            <div className={classes.categories}>
                                {categories.map((category, index) => {
                                    return (
                                        <Chip
                                            key={index}
                                            label={category}
                                            size="small"
                                            component="a"
                                            href={`/category/${category.toLowerCase()}`}
                                            clickable
                                        />
                                    );
                                })}
                            </div>
                            <Typography align="center" p={1}>
                                Total time: {totalTimeMinutes} min
                            </Typography>

                            {isAdmin && (
                                <Fab size="small" className={classes.edit}>
                                    <EditIcon />
                                </Fab>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
