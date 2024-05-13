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
  voices: Number
});
 
module.exports = CandidateSchema;