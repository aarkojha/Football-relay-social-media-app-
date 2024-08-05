import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        opacity: 0.9,
        width: '100%',
        borderRadius: 0,
        margin: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 50px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
        background: '#181818',
    },
    heading: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '2em',
        fontWeight: 300,
        [theme.breakpoints.down('sm')]: {
            paddingTop: '15px',
        },
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        },
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            marginTop: 20,
            justifyContent: 'center',
        },
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    logout: {
        borderRadius: '5px',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));