import fs from 'fs'
import path from 'path'

const BUILD_PATH = path.resolve(__dirname, '..', 'build')
const indexHtml = fs.readFileSync(`${BUILD_PATH}/index.html`, {
	encoding: 'utf-8'
})

const extract = (pattern: string, string: string) => {
	const matches = [] as any
	const re = new RegExp(pattern, 'g')
	let match = re.exec(string)
	while (match !== null) {
		if (match) {
			matches.push(match[1])
		}
		match = re.exec(string)
	}

	return matches
}

export default {
	css: extract('<link href="(.+?)" rel="stylesheet">', indexHtml),
	js: extract('<script type="text/javascript" src="(.+?)"></script>', indexHtml)
}
