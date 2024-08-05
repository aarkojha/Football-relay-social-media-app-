import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBarSearch: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
        background: '#181818',
    },
    pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        marginBottom: '1rem',
        padding: '5px',
        width: '100%',
        background: '#fff'
    },
    gridContainer: {
        // [theme.breakpoints.down('xs')]: {
        //     flexDirection: 'column-reverse',
        // },
    },
    formContainer: {
        opacity: 0.9,
        minHeight: '100vh',
        background: '#121212',
        borderRadius: '10px',
        marginTop: '70px',
        marginBottom: '30px',
        width: '500px'
    },
    formBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
        zIndex: -1
    },
    searchButton: {
        background: 'white'
    }
}));