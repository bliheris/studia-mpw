const server = require('./files-server')

const writeFile = () => {
	const now = new Date()
	const fileName = `temp${now.getTime()}.txt`
	server.uploadFile(fileName)
}

setInterval(writeFile, 100)