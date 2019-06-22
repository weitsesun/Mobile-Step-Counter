const express = require('express');
const mongoose = require('mongoose');
const db = require("../Database/index.js");

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let currentStep = 0;

app.get('/', (req, res) => {
  console.log('received a get request');
  console.log(currentStep);
  res.status(200).send(JSON.stringify(currentStep));
})

app.post('/', (req, res) => {
  console.log("current steps: " + req.body.currentStepCount);
  // let today = getToday();
  // db.stepData.save()
  this.currentStep = req.body.currentStep;
  console.log(this.currentStep);
  res.status(201);
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