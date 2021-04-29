const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const authClient = (accountId, authToken) => {
  return twilio(accountId, authToken);
}

export { client, authClient };

   
