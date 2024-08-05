import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import { commentPlayer } from '../../actions/players'

const CommentSection = ({ player }) => {
    const classes = useStyles()
    const [comments, setComments] = useState(player?.comments)
    const [comment, setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const commentsRef = useRef()

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPlayer(finalComment, player._id))

        setComments(newComments)
        setComment('')

        commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <Typography variant="h6" gutterBottom>Comments</Typography>
                <div className={classes.commentsInnerContainer}>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1" style={{ color: '#B3B3B3', width: '100%' }}>
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')?.map((el, idx) => idx === 0 ? null : ': ' + el) }
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                <Typography variant="body2">{!user && 'Sign in to comment'}</Typography>
                {user?.result?.name && (
                    <div style={{ width: '70%'}}>
                        <Typography variant="h6" gutterBottom style={{ color: 'white' }}>Write a comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="filled"
                            label="Comment here..."
                            multiline
                            InputLabelProps={{
                                style: { color: '#B3B3B3'},
                                background: '#181818'
                            }}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px', background: 'white', marginBottom: '20px' }}  disabled={!comment} variant="contained" onClick={handleClick}>
                            Submit
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection
