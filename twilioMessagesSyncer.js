require('dotenv').config()
const config = require('./config')

const WhatsappMessage = require('./models/WhatsappChat')

const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN} = process.env
let client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
let mongoose = null
let socketIo = null

function getNextFetchDate(){
 let d = new Date()
 d.setSeconds(config.twilioMessagesSyncer.messageFromLastSeconds)

 return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()))
}

function start(mongooseInstance, socket) {
  mongoose = mongooseInstance

  saveNewTwilioMessages(socket)
  setInterval(() => {  
    saveNewTwilioMessages(socket)
  }, config.twilioMessagesSyncer.messageSyncTimeInMs)
}

function saveNewTwilioMessages(socket){
  console.info('Fetching latest Twilio messages @ ' , new Date())
  // console.log(client.messages)
  client.messages
  .list({
    dateSentAfter: getNextFetchDate(),
  })
  .then(messages => {
    messages.map(message => {
      let roomId = message.direction === 'inbound' ? message.from : message.to
      message.from = cleanWhatsappNumber(message.from)
      message.to = cleanWhatsappNumber(message.to)

      const twilioMessage = new WhatsappMessage({...message})
      WhatsappMessage.findOne({sid: message.sid}, 'sid', function (err, messageFound) {
        if (err) {
          return console.error(err)
        } else if (messageFound && messageFound.direction !== 'outbound-api') { 
          socket.emit("FOUND_MESSAGE", messageFound); 
          return false
        } else {
          twilioMessage.save(err => {
            if (err) return console.error(err)
          })
        }
      })
    })
  })
  .catch(console.warn)
}

function cleanWhatsappNumber(phoneNumber){
  return phoneNumber.toLowerCase().replace('whatsapp:', '')
}

module.exports =  {
  start
}