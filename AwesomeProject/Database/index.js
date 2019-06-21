const mongoose = require('mongoose');

mongoose.connect('mongodb://3.17.24.167:27017/stepData', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const stepData = new Schema({
  name: String,
  date: String,
  steps: Number,
  steps24: Number
})

const StepData = mongoose.model('stepData', stepData);

module.exports = { StepData };