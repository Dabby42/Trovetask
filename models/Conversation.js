import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    messageId: {
        type: String
    },
    body: {
        type: String
    },
    author: {
        type: String
    },
    delivery: {
        type: Object,
    },
    participantId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('Conversation', ConversationSchema);
