const express = require('express')
const {getMsg, getMsgs, addMsg} = require('./msg.controller')
const router = express.Router()

router.get('/', getMsgs)
router.get('/:msgId', getMsg)
router.post('/', addMsg)

module.exports = router