import Axios from 'axios';
import cryptoRandomString from 'crypto-random-string';
 
const SMSNotification = async (userId, sender, phoneNumbers=[], message, senderName='') => {
  try {
    const randString = cryptoRandomString({length: 10, type: 'alphanumeric'});
    const id = `DBSMS${randString}`
    const payload = {
      id,
      to: phoneNumbers,
      from: sender,
      body: message,
      callback_url: `${process.env.SERVER_URL}/api/v1/notifications/users/${userId}/sms`,
      sender_mask: senderName
    }
    
    const AccountId = process.env.DOTGO_ACCOUNT_ID;

    const headers = { 
      Authorization: process.env.DOTGO_API_TOKEN,
      'Content-Type': 'application/json'
    };
    const { data } = await Axios({
      method: 'POST', 
      url: `https://konnect.dotgo.com/api/v1/Accounts/${AccountId}/Messages`, 
      data: payload,
      headers
    })
    console.log('Message sent status=>', data.status);
  } catch (error) {
    console.log('sms notification err =>', error);
  }
}

export default SMSNotification;
