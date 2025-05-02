const fs = require('fs')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const path = './static/shuoshuo.json'

const writeFile = (path, content, res) => {
  fs.writeFile(path, content, err => {
    if (err) {
      console.error('写入文件失败:', err)
      return
    }
    res.send('成功')
  })
}

// 简单写一个接口
app.post('/create', (req, res) => {
  let content = JSON.stringify([req.body], null, 2)
  if (fs.existsSync(path)) {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.error('读取文件失败:', err)
        return
      }
      content = JSON.parse(data)
      content.push(req.body)
      writeFile(path, JSON.stringify(content), res)
      res.send('成功')
    })
  } else {
    writeFile(path, content, res)
  }
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
