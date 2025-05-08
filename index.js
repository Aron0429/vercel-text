const cors = require('cors')
const path = require('path')
const express = require('express')

const { injectHref } = require('./middleware/context')

const adminRouter = require('./routes/admin')
const talksRouter = require('./routes/talks')

const app = express()

app.set('etag', false)
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(injectHref)
app.use('/', adminRouter)
app.use('/talks', talksRouter)

app.listen(9000, () => {
  console.log('Express Server running at http://127.0.0.1:9000')
})

module.exports = app
