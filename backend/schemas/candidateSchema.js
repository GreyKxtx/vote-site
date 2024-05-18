const mongoose = require('mongoose');
 
const CandidateSchema = new mongoose.Schema({
  tabId: {
    type: String,
    required: true
  },
  elementId: {
    type: String,
    required: true
  },
  voices: Number,
  default: 0
});
 
module.exports = CandidateSchema;