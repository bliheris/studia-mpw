const fs = require('fs')
const recursive = require('recursive-readdir')
const { seconds } = require('./time-helper')

const path = './server/'

const downloadDir = process.argv[2]

const arrDifference = (oldArr, newArr) => {
	return newArr.filter(i => oldArr.indexOf(i) < 0)
}

const downloadFile = (file) => {
	const idx = file.lastIndexOf('/')
	const fileName = file.substr(idx + 1)
	const path = `./${downloadDir}/${fileName}`
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
	recursive(path, (err, items) => {

		const diff = arrDifference(allItems, items)
		diff.forEach(file => {
			downloadFile(file)
		})
		allItems = items
	})
}

setInterval(readDir, seconds(3))

