import pkg from 'mongoose';
const { Schema, Decimal128, Number, model } = pkg;

const whatsappMessageSchema = new Schema({
	sid: {
		type: String,
		unique: true,
		required: true
	},
	body: String,
	direction: String,
	from: {
		type: String,
		index: true
	},
	to: {
		type: String,
		index: true
	},
	dateCreated: Date,
	priceUnit: String,
	accountSid: String,
	price: Decimal128,
	uri: String,
	numMedia: Number,
	subresourceUris: {
		media: String,
		feedback: String
	},
});

export default model('WhatsappMessage', whatsappMessageSchema);
