import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '0',
        width: '100%',
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 400,
        padding: '10%',
        borderRadius: '7px',
        transition: 'all 0.5s ease',
        boxShadow: '0 0 10px 4px #091629',
        '&:hover': {
            transform: 'translateY(-20px)',

        }
    },
    infoCard: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',

    },
    title: {
        fontSize: '3.5rem',
        margin: '50px 6% 20px 6%',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.5rem'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '2rem',
            textAlign: 'center'
        },
    },
    attribution: {
        color: '#64ffda',
        textDecoration: 'none',
        marginLeft: '6%',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            display: 'inline-block',
            width: '100%',
            marginLeft: '0'
        },
    }
}));