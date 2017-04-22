const fs = require('fs')
const { groupBy, keys } = require('lodash')

const QUEUE_PROCESS_TIME = 50
const FILE_UPLOAD_TIME = 1000 * 10
const WORKER_TASK_LIMIT = 2

const workers = [
	{index: 1, tasks: 0},
	{index: 2, tasks: 0},
	{index: 3, tasks: 0},
]

const findFreeWorker = () => {
	return workers.find(i => i.tasks < WORKER_TASK_LIMIT)
}

const increaseWorkerTaskCount = (worker) => {
	worker.tasks = worker.tasks + 1
}

const decreaseWorkerTasksCount = (worker) => {
	worker.tasks = worker.tasks - 1
}

let myQueue = []

const processQueue = () => {
	if(myQueue.length === 0){
		return
	}

	const worker = findFreeWorker()
	if(worker){
		[task, ...myQueue] = myQueue
		increaseWorkerTaskCount(worker)
		console.log('Processing task:', task.file, 'for ', task.clientId, ' on', worker.index)

		const path = `./server/c${worker.index}/${task.file}`
		setTimeout(() => {
			fs.writeFile(path, task.clientId, (err) => {
				if (err) {
					//console.log('Error when creating a file')
					return
				}
				//console.log('File saved on c', worker.index)
				decreaseWorkerTasksCount(worker)
			})
		}, FILE_UPLOAD_TIME)

	}
}

setInterval(processQueue, QUEUE_PROCESS_TIME)

const reorderQueue = (queue) => {

	const grouped = groupBy(queue, 'clientId')
	const clientKeys = keys(grouped)

	let longest = 0
	clientKeys.forEach(client => {
		const tasksLength = grouped[client].length
		longest = tasksLength > longest ? tasksLength: longest
	})

	const newQueue = []
	let i
	for(i = 0; i < longest; i++){
		clientKeys.forEach(client => {
			const item = grouped[client][i]
			if(item){
				newQueue.push(item)
			}
		})
	}

	return newQueue
}

const internalFileUpload = (uploadTask) => {
	myQueue = myQueue.concat(uploadTask)
	console.log('Old queue', myQueue)
	myQueue = reorderQueue(myQueue)
	console.log('New queue', myQueue)
}

module.exports = {
	uploadFile: internalFileUpload
}

