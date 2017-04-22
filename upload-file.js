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

server.uploadFile({
	file: 'a.txt',
	clientId: 'maciek'
})

server.uploadFile({
	file: 'a.txt',
	clientId: 'maciek'
})

server.uploadFile({
	file: 'a.txt',
	clientId: 'maciek'
})

setInterval(() => writeFile('maciek'), seconds(4))
setInterval(() => writeFile('psipsiak'), seconds(6))