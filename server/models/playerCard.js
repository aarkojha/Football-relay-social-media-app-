import mongoose from 'mongoose'

const playerSchema = mongoose.Schema({
    player_name: String,
    description: String,
    name: String, // Name of the playerCard creator
    creator: String, // UserId of the logged in person
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PlayerCard = mongoose.model('PlayerCard', playerSchema)

export default PlayerCard