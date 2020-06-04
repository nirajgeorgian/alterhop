const express = require('express')
const app = express() // create our app w/ express
const methodOverride = require('method-override') // simulate DELETE and PUT (express4)
const path = require('path')
const port = process.env.PORT || 3000

app.use(express.static(`${__dirname}./build`)) // set the static files location /public/img will be /img for users
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port)
console.log('App listening on port ', port)
