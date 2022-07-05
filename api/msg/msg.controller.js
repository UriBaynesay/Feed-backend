const msgService = require('./msg.service')
const logger = require('../../services/logger.service')

async function getMsg(req, res) {
    try {
        const msg = await msgService.getById(req.params.msgId)
        res.send(msg)
    } catch (err) {
        logger.error('Failed to get msg', err)
        res.status(500).send({ err: 'Failed to get msg' })
    }
}

async function getMsgs(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
        }
        const msgs = await msgService.query(filterBy)
        res.send(msgs)
    } catch (err) {
        logger.error('Failed to get msgs', err)
        res.status(500).send({ err: 'Failed to get msgs' })
    }
}

async function addMsg(req, res) {
    try {
        const msg = req.body
        const savedMsg = await msgService.add(msg)
        res.send(savedMsg)
    } catch (err) {
        logger.error('Failed to add msg', err)
        res.status(500).send({ err: 'Failed to add msg' })
    }
}

module.exports = {
  getMsg,
  getMsgs,
  addMsg,
}