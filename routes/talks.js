const express = require('express')
const router = express.Router()

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
}

// 简单写一个接口
router.post('/create', async (req, res) => {
  const { author, date, content, tags } = req.body

  const Talks = AV.Object.extend('Talks')
  const talks = new Talks()
  talks.set('author', author)
  talks.set('date', date)
  talks.set('content', content)
  talks.set('tags', tags.split(','))

  talks.save().then(
    talk => {
      res.status(200).send('成功')
    },
    error => {
      res.status(500).send({ code: 500, message: error.message, data: JSON.stringify(error) })
    },
  )
})

// 简写写一个获取用户的接口
router.get('/getTalk', async (req, res) => {
  try {
    const query = new AV.Query('Talks')
    const talkList = await query.find()
    res.status(200).send(talkList)
  } catch (error) {
    res.status(500).send({ code: 500, message: error.message, data: JSON.stringify(error) })
  }
})

module.exports = router
