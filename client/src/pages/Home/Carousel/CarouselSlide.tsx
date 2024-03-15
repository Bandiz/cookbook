import { Link } from 'react-router-dom';
import { useStyles } from './CarouserSlide';
import { Box, Card } from '@mui/material';

export default function CarouselSlide(props: any) {
    const { title, imageUrl, id } = props.content;

    const { classes } = useStyles();

    return (
        <Card className={classes.card} sx={{ width: { xs: 300, md: 700 } }}>
            <Link to={`/recipe/${id}`}>
                <Box
                    component="img"
                    className={classes.box}
                    sx={{
                        height: { xs: 300, md: 500 },
                        maxWidth: { xs: 300, md: 700 },
                    }}
                    src={imageUrl}
                    alt={title}
                />
            </Link>
        </Card>
    );
}
