import mongoose from 'mongoose';

const PortFolioSchema = new mongoose.Schema({
	symbol:{ type: String},
    totalQuantity: {type: String},
    pricePerShare: {type: String},
    equityValue: {type: Number},
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

export default mongoose.model('Portfolio', PortFolioSchema);
