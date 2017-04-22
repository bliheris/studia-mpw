const server = require('./files-server')
const { seconds } = require('./time-helper')

const writeFile = (clientId) => {
	const now = new Date()
	const fileName = `temp${now.getTime()}.txt`
	server.uploadFile({
		file: fileName,
		clientId
	})
}

setInterval(() => writeFile('maciek'), seconds(1))
setInterval(() => writeFile('psipsiak'), seconds(10))