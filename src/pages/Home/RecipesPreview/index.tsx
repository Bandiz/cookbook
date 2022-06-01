import { Link } from 'react-router-dom';
import { useRecipes } from '../../../contexts/RecipesContext';
import { useStyles } from './RecipesPreview';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

export default function RecipesPreview() {
    const { recipes } = useRecipes();
    const { classes } = useStyles();

    if (!recipes || recipes.length === 0) {
        return null;
    }

    return (
        <ImageList>
            {recipes.map((item) => (
                <ImageListItem component={Link} to={`/recipe/${item.id}`} key={item.id}>
                    <img
                        className={classes.hover}
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
