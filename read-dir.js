const fs = require('fs')
const fse = require('fs-extra')
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

	fse.copy(file, path, err => {
		if (err) return console.error(err)
		console.log(`File ${fileName} downloaded`)
	})
}

let allItems = []

const readDir = () => {

	recursive(path, (err, items) => {
		const diff = arrDifference(allItems, items)
		allItems = items
		diff.forEach(file => {
			downloadFile(file)
		})
	})
}

setInterval(readDir, seconds(3))

