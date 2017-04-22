const server = require('./files-server')
const { seconds } = require('./time-helper')

const writeFile = () => {
	const now = new Date()
	const fileName = `temp${now.getTime()}.txt`
	server.uploadFile(fileName)
}

setInterval(writeFile, seconds(1))