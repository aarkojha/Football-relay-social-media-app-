import express from 'express'

import { getPlayersBySearch, getPlayer, getPlayers, createPlayer, updatePlayer, deletePlayer, likePlayer, commentPlayer } from '../controllers/players.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/search', getPlayersBySearch)
router.get('/', getPlayers)
router.get('/:id', getPlayer)

router.post('/', auth, createPlayer)
router.patch('/:id', auth, updatePlayer)
router.delete('/:id', auth, deletePlayer)
router.patch('/:id/likePlayer', auth, likePlayer)
router.post('/:id/commentPlayer', auth, commentPlayer)

export default router