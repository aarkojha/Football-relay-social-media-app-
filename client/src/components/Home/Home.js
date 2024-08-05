import React, { useState } from 'react'
import { Container, Grid, Paper, AppBar, TextField, Button, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

import { getPlayersBySearch } from '../../actions/players'
import Players from '../Players/Players'
import Form from '../Form/Form'
import Pagination from '../Pagination/Pagination'
import useStyles from './styles'
import RonaldoOldTraffordBg from '../../images/RonaldoOldTrafford.jpg'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    // const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const searchPlayer = () => {
        if (search.trim() || tags) {
            dispatch(getPlayersBySearch({ search, tags: tags.join(',') }))
            history.push(`/players/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            history.push('/')
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPlayer()
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag])

    const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete))

    return (
        <Container>
            <Grid container className={classes.gridContainer} justifyContent="space-between" align="stretch" spacing={3}>
                <div className={classes.formBg}>
                    <img src={RonaldoOldTraffordBg} alt="RonaldoOldTraffordBg" />
                </div>
                <Grid item className={classes.formContainer}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    <Typography variant="h6" style={{ color: 'white', textAlign: 'center', marginTop: '20px', marginBottom: '10px' }}>Search a player by name / tags</Typography>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField
                            name="search"
                            variant="outlined"
                            label="Search players by name"
                            onKeyPress={handleKeyPress}
                            fullWidth
                            InputLabelProps={{
                                style: { color: '#B3B3B3' }
                            }}
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                        <ChipInput
                            style={{ margin: '10px 0' }}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label="Search tags (hit enter)"
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: '#B3B3B3' }
                            }} />
                        <Button onClick={searchPlayer} className={classes.searchButton} variant="contained">Search</Button>
                    </AppBar>

                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Players setCurrentId={setCurrentId} />
                </Grid>
                <Paper elevation={6} className={classes.pagination}>
                    <Pagination page={page} />
                </Paper>
            </Grid>
        </Container>

    )
}

export default Home
