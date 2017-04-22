const fs = require('fs')

let server = 1

const changeServer = () => {
	if(server > 2){
		server = 1
		return
	}
	server++
}

const limits = [{index: 0, value: 0}, {index: 1, value: 0}, {index: 2, value: 0}]

let myQueue = []

const yyy = (index) => () => {
	const xx = limits.find(i => i.index === index)
	xx.value = xx.value - 1
}

const processQueue = () => {
	if(myQueue.length === 0){
		return
	}
	//console.log('queue');
	// console.log(myQueue);

	[task, ...otherTasks] = myQueue
	const x = limits.find(i => i.value < 2)
	if(x){
		myQueue = otherTasks
		x.value = x.value + 1
		// console.log(limits)
		console.log('Processing task:', task, ' on', x.index)

		setTimeout(yyy(x.index),5000)
	}else{
		console.log('Cannot find worker to process task')
	}
}

setInterval(processQueue, 50)

const internalFileUpload = (file) => {
	myQueue.push(file)
}

// const internalFileUpload = (file) => {
// 	const path = `./server/c${server}/${file}`
// 	const writeServer = server
// 	changeServer()
//
// 	setTimeout(() => {
// 		fs.writeFile(path, 'test1', (err) => {
// 			if(err){
// 				console.log('Error when creating a file')
// 				return
// 			}
// 			console.log('File saved on c', writeServer)
// 		})
// 	}, 1000 * 5)
// }



module.exports = {
	uploadFile: internalFileUpload
}

