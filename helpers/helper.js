//Dependencies
import socket from 'socket.io';
import twilioMessagesSyncer from '../twilioMessagesSyncer';
import { client } from '../config/twilio';

// Declare the helper
const helper = {}

helper.socket = async function(app){
    let io = socket(app);
    io.on('connection', socket  => { 
        console.log('a user connected');
    
        // Listen for new messages
        socket.on("SEND_MESSAGE", async function(msg) {
        console.log(msg);
        const {body, from, to} = msg;
        try {
            const response = await client.messages.create({
                from: `whatsapp:${from}`,
                body,
                to: `whatsapp:${to}`,
            })
            response.from = helper.cleanWhatsappNumber(response.from);
            response.to = helper.cleanWhatsappNumber(response.to);
            delete response.errorMessage;
            delete response.price;
            delete response.dateUpdated;
            delete response.numSegments;
            delete response.messagingServiceSid;
            delete response.dateSent;
            delete response.errorCode;
            delete response.apiVersion;
    
            let newResponse = new WhatsappMessage(response);
            await newResponse.save();
            socket.emit("SENDER_MESSAGE", response);
        } catch (error) {
            console.log(error);
        }
        });
        twilioMessagesSyncer.start(mongoose, socket)   
    })
};

helper.cleanWhatsappNumber = function(phoneNumber){
    return phoneNumber.toLowerCase().replace('whatsapp:', '')
}

export default helper;
