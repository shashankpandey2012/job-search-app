var express = require('express');
var cors = require('cors');
var axios = require('axios');
var app = express();

app.use(cors());

app.get('/jobs', async (req, res) => {
   console.log("Called /jobs");
   axios.get(`https://jobs.github.com/positions.json?description=${req.query.language}`, {
    headers: {'Access-Control-Allow-Origin': '*'}
  }).then((response) => {
     res.json(response.data);
   }).catch((err) => {
     res.send(err);
   });

});

app.get('/getJobById', async (req, res) => {
  console.log("Called /getJobById");
  axios.get(`https://jobs.github.com/positions/${req.query.id}.json`, {
    headers: {'Access-Control-Allow-Origin': '*'}
  }).then((response) => {
    res.json(response.data);
  }).catch((err) => {
    res.send(err);
  });

});

console.log("Server Listening");
app.listen(8001);
