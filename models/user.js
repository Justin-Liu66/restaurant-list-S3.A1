const mongoose = require('mongoose') //載入mongoose
const Schema = mongoose.Schema //mongoose提供的模組

const userSchema = new Schema({
  name: {
    type:String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)