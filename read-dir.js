const fs = require('fs')

const path = './server/'
const second = 1000

const downloadDir = process.argv[2]

const arrDifference = (oldArr, newArr) => {
	return newArr.filter(i => oldArr.indexOf(i) < 0)
}

const downloadFile = (file) => {
	const path = `./${downloadDir}/${file}`
	fs.writeFile(path, (err) => {
		if(err){
			console.log('Error when downloading a file', err)
			return
		}

		console.log(`File ${file } downloaded`)
	})
}

let allItems = []

const readDir = () => {
	fs.readdir(path, (err, items) => {

		const diff = arrDifference(allItems, items)
		console.log(diff)
		diff.forEach(file => {
			downloadFile(file)
		})
		allItems = items
	})
}

setInterval(readDir, second  * 3)

