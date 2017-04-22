//const fs = require('fs')

const server = require('./server-impl')

const writeFile = () => {
	const now = new Date()
	const fileName = `temp${now.getTime()}.txt`
	server.uploadFile(fileName)
}

setInterval(writeFile, 100 * 1)