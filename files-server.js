const fs = require('fs')

const QUEUE_PROCESS_TIME = 50
const FILE_UPLOAD_TIME = 1000 * 5
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

	[task, ...otherTasks] = myQueue
	const worker = findFreeWorker()
	if(worker){
		myQueue = otherTasks
		increaseWorkerTaskCount(worker)
		console.log('Processing task:', task, ' on', worker.index)

		//setTimeout(() => decreaseWorkerTasksCount(worker), 5000)

		const path = `./server/c${worker.index}/${task}`
		setTimeout(() => {
			fs.writeFile(path, 'test1', (err) => {
				if (err) {
					console.log('Error when creating a file')
					return
				}
				console.log('File saved on c', worker.index)
				decreaseWorkerTasksCount(worker)
			})
		}, FILE_UPLOAD_TIME)

	}
}

setInterval(processQueue, QUEUE_PROCESS_TIME)

const internalFileUpload = (file) => {
	myQueue.push(file)
}

module.exports = {
	uploadFile: internalFileUpload
}

