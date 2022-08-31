const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resortSchema = new Schema({})

module.exports = mongoose.model('Resort', resortSchema)
