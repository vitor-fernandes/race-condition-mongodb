const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');  

const { registerNotVuln } = require('./functions/CRUD')

const app = express()

mongoose.connect('mongodb://localhost:30002/raceCondition', {useNewUrlParser: true});

app.use(bodyParser.json());

app.post('/user', wrap(queue(registerNotVuln)));

app.listen(3000);

function queue(fn) {
  let lastPromise = Promise.resolve();
  return function(req) {
    let returnedPromise = lastPromise.then(() => fn(req));
    // If `returnedPromise` rejected, swallow the rejection for the queue,
    // but `returnedPromise` rejections will still be visible outside the queue
    lastPromise = returnedPromise.catch(() => {});
    return returnedPromise;
  };
}

function wrap(fn) {
  return function(req, res, next) {
    fn(req).then(returnVal => res.json(returnVal)).catch(err => {res.status(500).json({ message: err.message });console.log(err)});
  };
}