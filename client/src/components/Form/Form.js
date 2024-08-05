import React, { useState, useEffect, useRef } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useStyles from './styles'
import { createPlayer, updatePlayer } from '../../actions/players'

const Form = ({ currentId, setCurrentId }) => {
    const [playerData, setPlayerData] = useState({ player_name: '', description: '', tags: '', selectedFile: '' })
    const player = useSelector((state) => currentId ? state.players.players.find(p => p._id === currentId) : null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()
    const formRef = useRef()

    useEffect(() => {
        if (player) {
            setPlayerData(player)
            formRef?.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [player])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePlayer(currentId, { ...playerData, name: user?.result?.name }))
        } else {
            dispatch(createPlayer({ ...playerData, name: user?.result?.name }, history))
        }

        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setPlayerData({ player_name: '', description: '', tags: '', selectedFile: '' })
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center" style={{ color: '#B3B3B3' }}>
                    Please sign in to add your own player cards.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <div ref={formRef} />
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6" style={{ color: 'white' }}>{currentId ? 'Editing' : 'Creating'} a Player Card</Typography>
                <TextField
                    name="player_name"
                    variant="outlined"
                    label="Player Name"
                    fullWidth
                    value={playerData.player_name}
                    onChange={(e) => setPlayerData({ ...playerData, player_name: e.target.value })}
                    InputLabelProps={{
                        style: { color: '#B3B3B3' }
                    }} />
                <TextField
                    name="description"
                    variant="outlined"
                    multiline
                    rows={4}
                    label="Short description"
                    InputLabelProps={{
                        style: { color: '#B3B3B3' },
                    }}
                    fullWidth
                    value={playerData.description}
                    onChange={(e) => setPlayerData({ ...playerData, description: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags (comma separated)"
                    fullWidth
                    value={playerData.tags}
                    onChange={(e) => setPlayerData({ ...playerData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                    InputLabelProps={{
                        style: { color: '#B3B3B3' }
                    }} />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPlayerData({ ...playerData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" type="submit" fullWidth>Submit</Button>
                <Button className={classes.clear} variant="contained" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form