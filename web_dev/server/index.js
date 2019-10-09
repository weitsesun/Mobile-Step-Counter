const express = require('express');
const mongoose = require('mongoose');
const { Steps } = require("../Database/schema.js");
// mongoose.connect('mongodb://localhost:27017/steps', { useNewUrlParser: true });

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../client/dist`));

app.get('/steps', (req, res) => {
  let getNow = req.query.date;
  Steps.find({ "date": getNow }, (err, data) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(data);
  })
})

app.post('/', (req, res) => {
  let today = getToday();
  console.log(today)
  // try {
  //   Steps.update(
  //     {
  //       "date": today,

  //       "curSteps": req.body.currentStepCount,
  //       "stepsToday": req.body.pastStepCount
  //     },
  //     { upsert: true })
  // }
  // catch (e) {
  //   res.status(500).send(e);
  // }
  Steps.findOneAndUpdate(
    { "date": today },
    {
      "curSteps": req.body.currentStepCount,
      "stepsToday": req.body.pastStepCount
    },
    { upsert: true },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.status(201).send('finished');
    })
})

function getToday() {
  let today = new Date();
  let dd = today.getDate() - 1;
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return mm + '/' + dd + '/' + yyyy;
}

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
});