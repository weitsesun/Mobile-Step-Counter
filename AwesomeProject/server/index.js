const express = require('express');
const mongoose = require('mongoose');
const { Steps } = require("../Database/schema.js");

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  Steps.find({}, (err, data) => {
    if(err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(data);
  })
})

app.post('/', (req, res) => {
  let today = getToday();
  Steps.findOneAndUpdate({"date": today}, {"curSteps": req.body.currentStepCount}, {upsert: true}, 
              (err, data) => {
                  if(err) {
                    console.log(err);
                    res.status(500).send(err);
                    return;
                  }
                  // console.log(data);
                  res.status(201).send();
              })
})

function getToday() {
  let today = new Date();
  let dd = today.getDate();
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