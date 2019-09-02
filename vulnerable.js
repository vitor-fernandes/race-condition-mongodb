const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');

const { register } = require('./functions/CRUD')

const app = express()

mongoose.connect('mongodb://localhost:30002/raceCondition', {useNewUrlParser: true});

app.use(bodyParser.json());

app.post('/user', wrap( async function(req) { await register(req); }));

app.listen(3000);

function wrap(fn) {
  return function(req, res, next) {
    fn(req)
    .then(returnVal => { res.json("User Created") })
    .catch(err => { res.status(500).json({ message: err.message }) });
  };
}