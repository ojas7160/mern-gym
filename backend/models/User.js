const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  membershipNumber: {type: Number, required: true, unique: true},
  password: {type: String, required: true},
  admissionType: {type: String}, // annual, quarterly, monthly
  feesSubmissionDate: {type: Date},
  dueDate: {type: Date},
  active: {type: Boolean, default: true},
  phone: {type: String, unique: true, required: true},
  address: {type: String},
  payment: {type: Number},
  email: {type: String},
  userId: {type: String},
  imagePath: {type: String}
  // email: {type: String, required: true},
  // password: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchema);