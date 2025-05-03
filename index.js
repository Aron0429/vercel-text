const cors = require('cors')
const express = require('express')
const AV = require('leancloud-storage')

const { LEAN_ID, LEAN_KEY, LEAN_MASTER_KEY, LEAN_SERVER } = process.env

if (LEAN_ID && LEAN_KEY && LEAN_MASTER_KEY) {
  AV.Cloud.useMasterKey(true)
  AV.init({
    appId: LEAN_ID,
    appKey: LEAN_KEY,
    masterKey: LEAN_MASTER_KEY,
    serverURL: LEAN_SERVER,
  })
  const Talks = AV.Object.extend('Talks')
  const talks = new Talks()
}

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 简单写一个接口
app.post('/create', async (req, res) => {
  const { author, date, content, tags } = req.body
  talks.set('author', author)
  talks.set('date', date)
  talks.set('content', content)
  talks.set('tags', tags.split(','))

  talks.save().then(
    talk => {
      res.status(200).send('成功')
    },
    error => {
      res.status(200).send(error)
    },
  )
})

// 简写写一个获取用户的接口
app.get('/getTalk', (req, res) => {
  const query = new AV.Query('Talks')
  query.find().then(
    counters => {
      res.status(200).send(counters)
    },
    error => {
      res.status(200).send(error)
    },
  )
})

app.listen(9000, () => {
  console.log('Express Server running at http://127.0.0.1:9000')
})

module.exports = app
