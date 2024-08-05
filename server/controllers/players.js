import mongoose from 'mongoose'
import PlayerCard from '../models/playerCard.js'
import axios from 'axios'

export const getPlayer = async (req, res) => {
    const { id: _id } = req.params

    try {
        const player = await PlayerCard.findById(_id)
        const NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${process.env.NEWS_API_KEY}&q=${player.player_name}`
        const articles = (await axios.get(NEWS_API_URL)).data.articles.slice(0, 8)

        res.status(200).json({data: {...player._doc, articles}})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPlayers = async (req, res) => {
    let { page } = req.query

    try {
        if(!page) page = 1
        
        const LIMIT = 6
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await PlayerCard.countDocuments({})

        const players = await PlayerCard.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

        res.status(200).json({ data: players, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPlayersBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query

    try {
        if (searchQuery === 'none' && tags.length === 0) {
            const players = await PlayerCard.find().sort({ _id: -1 }).limit(6)
            res.status(200).json({ data: players })
        } else {
            const player_name = new RegExp(searchQuery, 'i')
            const players = await PlayerCard.find({ $or: [{ player_name }, { tags: { $in: tags.split(',') } }] })

            res.status(200).json({ data: players })
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPlayer = async (req, res) => {
    const player = req.body
    const newPlayer = new PlayerCard({ ...player, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPlayer.save()
        res.status(201).json(newPlayer)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePlayer = async (req, res) => {
    const { id: _id } = req.params
    const player = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No player card with that id')

    const updatedPlayer = await PlayerCard.findByIdAndUpdate(_id, { ...player, _id }, { new: true })

    res.json(updatedPlayer)
}

export const deletePlayer = async (req, res) => {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No player card with that id')

    const deletedPlayer = await PlayerCard.findByIdAndRemove(_id)

    res.json(deletedPlayer)
}

export const likePlayer = async (req, res) => {
    const { id: _id } = req.params

    if (!req.userId) return res.json({ message: 'Please authenticate' })

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No player card with that id')

    const player = await PlayerCard.findById(_id)

    const index = player.likes.findIndex(id => id === String(req.userId))
    if (index === -1) {
        player.likes.push(req.userId)
    } else {
        player.likes = player.likes.filter(id => id !== String(req.userId))
    }

    const updatedPlayer = await PlayerCard.findByIdAndUpdate(_id, player, { new: true })

    res.json(updatedPlayer)
}

export const commentPlayer = async (req, res) => {
    const { id } = req.params
    const { value } = req.body

    const player = await PlayerCard.findById(id)

    player.comments.push(value)

    const updatedPlayer = await PlayerCard.findByIdAndUpdate(id, player, { new: true })

    res.json(updatedPlayer)
}