import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40px',
    },
    paper: {
        width: '400px',
        padding: '24px',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
