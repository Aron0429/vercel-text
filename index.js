const fs = require('fs')
const cors = require('cors')
const express = require('express')
const AV = require('leancloud-storage')

const { LEAN_ID, LEAN_KEY, LEAN_MASTER_KEY, LEAN_SERVER } = process.env

// process.env.
AV.Cloud.useMasterKey(true)
AV.init({
  appId: 'lwbXnvoNIqG3qCB4hegleYrS-MdYXbMMI',
  appKey: 'b5Yx8DMBXQVplVwWcrI5niFF',
  masterKey: 'xyKAWlk6uyk44m10yoU2gF4g',
  serverURL: LEAN_SERVER,
})

const app = express()
const Talks = AV.Object.extend('Talks')
const talks = new Talks()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const path = './static/shuoshuo.json'

// 简单写一个接口
app.post('/create', async (req, res) => {
  const { author, date, content, tags } = req.body

  const query = new AV.Query('Counter')
  query.find().then(
    counters => {
      res.send(counters)
    },
    error => {
      res.send(error)
    },
  )

  // talks.set('author', author)
  // talks.set('date', date)
  // talks.set('content', content)
  // talks.set('tags', tags.split(','))

  // talks.save().then(
  //   talk => {
  //     res.send('成功')
  //   },
  //   error => {
  //     console.log(error)
  //     res.send('失败')
  //   },
  // )
})

// 简写写一个获取用户的接口
app.get('/getTalk', (req, res) => {
  if (fs.existsSync(path)) {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.error('读取文件失败:', err)
        return
      }
      content = JSON.parse(data)
      content.forEach(item => {
        if (typeof item.tags === 'string') {
          item.tags = JSON.parse(item.tags)
        }
      })
      res.status(200).send(content)
    })
  } else {
    res.status(200).json({
      code: 500,
      msg: 'error',
      data: null,
    })
  }
})

app.listen(9000, () => {
  console.log('Express Server running at http://127.0.0.1:9000')
})

module.exports = app
