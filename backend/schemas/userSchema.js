const mongoose = require('mongoose');
 
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  messanger: {
    type: String,
  },
  date: { type: Date, default: Date.now },
  refferals: {
    type: Number,
    default: 0
  }
});
 
module.exports = UserSchema;