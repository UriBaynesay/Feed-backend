const dbService = require("../../services/db.service")
const md5 = require("md5")
const logger = require("../../services/logger.service")
const { ObjectId } = require("mongodb")

module.exports = {
  query,
  getById,
  add,
}

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy)
  try {
    const collection = await dbService.getCollection("msgs_db")
    const msgs = await collection.find(criteria).toArray()
    return msgs
  } catch (err) {
    logger.error("cannot find msgs", err)
    throw err
  }
}

async function getById(msgId) {
  try {
    const collection = await dbService.getCollection("msgs_db")
    const msg = await collection.findOne({ _id: ObjectId(msgId) })
    return msg
  } catch (err) {
    logger.error(`while finding msg ${msgId}`, err)
    throw err
  }
}

async function add(msg) {
  try {
    const msgToAdd = {
      email: msg.email,
      txt: msg.txt,
      imgUrl: "https://www.gravatar.com/avatar/" + md5(msg.email),
    }
    const collection = await dbService.getCollection("msgs_db")
    await collection.insertOne(msgToAdd)
    return msgToAdd
  } catch (err) {
    logger.error("cannot insert msg", err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: "i" }
    criteria.$or = [
      {
        email: txtCriteria,
      },
      {
        txt: txtCriteria,
      },
    ]
  }
  return criteria
}
