import { Link } from 'react-router-dom';
import { useStyles } from './RecipesPreview';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useRecipes } from '../../../api/recipes';

export default function RecipesPreview() {
    const { data: recipes } = useRecipes();
    const { classes } = useStyles();

    if (!recipes || recipes.length === 0) {
        return null;
    }

    return (
        <ImageList className={classes.list} variant="woven" gap={8}>
            {recipes.map((item) => (
                <ImageListItem component={Link} to={`/recipe/${item.id}`} key={item.id}>
                    <img
                        className={classes.image}
                        src={item.imageUrl}
                        srcSet={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar title={item.title} subtitle={`Total time: ${item.totalTimeMinutes} min`} />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
