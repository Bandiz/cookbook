import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()({
    recipes: {
        display: 'flex',
        width: '100%',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    item: {
        flexShrink: '0',
        position: 'relative',
    },
    image: {
        objectFit: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '300px',
        height: '200px',
    },
    categories: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
    },
    edit: {
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
});
