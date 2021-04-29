import dotenv from 'dotenv'
dotenv.config()
const {PORT, SOCKET_PORT} = process.env

export const listenPort = {
	express: PORT,
	socketIo: SOCKET_PORT
}
export const twilioMessagesSyncer = {
	messageFromLastSeconds: -30,
	messageSyncTimeInMs: 30000
}