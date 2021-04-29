import mongoose from 'mongoose';

const BotSchema = new mongoose.Schema({
    botId: {type: String, required: true},
	friendlyName:{ type: String},
    developmentStage: {type: String},
    uniqueName: {type: String},
    isActive: {type: Boolean, default: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('Bot', BotSchema);
