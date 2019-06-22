const mongoose = require('mongoose');  

const Schema = mongoose.Schema;
const Steps = mongoose.model("steps", new Schema({ date: String, curSteps: Number }));

mongoose.connect('mongodb://localhost:27017/steps', { useNewUrlParser: true });


module.exports = { Steps };