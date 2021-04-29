import cryptoRandomString from 'crypto-random-string';
import Axios from 'axios';
import { client } from '../../../config/twilio';
import { cleanWhatsappNumber } from '../../helpers';
 
const WhatsappNotification = async (sender, receiver, message, userId) => {
  try {
    const randString = cryptoRandomString({length: 10, type: 'alphanumeric'});
    const id = `DBWA${randString}`
    const payload = {
      from: `whatsapp:${sender}`,
      body: message,
      to: `whatsapp:${receiver}`
    }

    const twilioWhatsappMessage = await client.messages.create(payload);

    const headers = {
      'Content-Type': 'application/json'
    };

    const reqData = {
      id,
      ref_id: twilioWhatsappMessage.sid,
      to: cleanWhatsappNumber(twilioWhatsappMessage.to),
      from: cleanWhatsappNumber(twilioWhatsappMessage.from),
      status: twilioWhatsappMessage.status,
      body: twilioWhatsappMessage.body,
      price: twilioWhatsappMessage.price,
      error_code: twilioWhatsappMessage.errorCode,
      error_reason: twilioWhatsappMessage.errorMessage,
      event_timestamp: twilioWhatsappMessage.dateSent
    }

    const { data } = await Axios({
      method: 'POST', 
      url: `${process.env.SERVER_URL}/api/v1/notifications/users/${userId}/whatsapp`, 
      data: reqData,
      headers
    })
    console.log('Whatsapp Message sent status=>', twilioWhatsappMessage.status);
    console.log('Notification Webhook data sent=>', data.message);

  } catch (error) {
    console.log('whatsapp notification err =>', error);
  }
}

export default WhatsappNotification;
