const express = require('express');
const mongoose = require('mongoose');
const db = require("../Database/index.js");

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log("hi");
})

app.post('/', (req, res) => {
  // console.log('received a post request');
  // console.log(req.body.pastStepCount);
  console.log("current steps: " + req.body.currentStepCount);
  res.status(200).send();
})

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
});