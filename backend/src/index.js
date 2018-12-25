//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// define the Express app
const app = express();

// the database
let questions = [];
const fileName = 'questions.json';
const fs = require('fs');
const path = require('path');

loadDataFromFile();

// https://stackabuse.com/reading-and-writing-json-files-with-node-js/
function loadDataFromFile() {

  // depressed
  // path.exists(fileName, function(exists) {
  //   if (exists) {
  //     // do something
  //     try {
  //       fs.readFile(fileName, (err, data) => {
  //         if (err) throw err;
  //         questions = JSON.parse(data);
  //         console.log(questions);
  //       });
  //     }
  //     catch (e) {
  //       console.error(e);
  //     }
  //   }
  // });

  if (fs.existsSync(fileName)) {
    // console.log('Found file');

    // do something
    try {
      fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        questions = JSON.parse(data);
        console.log(questions);
      });
    }
    catch (e) {
      console.error(e);
      res.status(500).send();
    }
  }
}

function writeData2File() {
  console.log('writeData2File...');
  try {
    fs.writeFileSync(fileName, JSON.stringify(questions));
  }
  catch (e) {
    console.error(e);
  }
}

const mysql = require('mysql');

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername",
//   password: "yourpassword"
// });
//
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// retrieve all questions
app.get('/', (req, res) => {
  const qs = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    answers: q.answers.length,
  }));
  res.send(qs);
});

// get a specific question
app.get('/:id', (req, res) => {
  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  res.send(question[0]);
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://youzhuo.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'xR7RG0nOdN7MFg9PLjlm2pANf6H3TjvC',
  issuer: `https://youzhuo.auth0.com/`,
  algorithms: ['RS256']
});

// insert a new question
app.post('/add', checkJwt, (req, res) => {
  const {title, description} = req.body;
  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
    author: req.user.name,
  };
  questions.push(newQuestion);
  res.status(200).send();
});

app.post('/save', checkJwt, (req, res) => {
  try {
    writeData2File();
    res.status(200).send();
  }
  catch (e) {
    console.error(e);
  }
});

// insert a new answer to a question
app.post('/answer/:id', checkJwt, (req, res) => {
  const {answer} = req.body;

  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();

  question[0].answers.push({
    answer,
    author: req.user.name,
  });

  res.status(200).send();
});

// remove all answers
app.post('/answer/:id/removeAll', checkJwt, (req, res) => {
  const question = questions.filter(q => (q.id === parseInt(req.params.id)));

  if (question.length === 0) return res.status(404).send();

  question[0].answers = [];

  res.status(200).send();
});


// Remove an old answer
app.post('/delete/:id', checkJwt, (req, res) => {
  const {answer} = req.body;

  const question = questions.filter(q => (q.id === parseInt(req.params.id)));

  // mock
  // return res.status(500).send();

  if (question.length === 0) {
    return res.status(404).send();
  }

  // remove it
  const index = questions.indexOf(question);
  questions.splice(index, 1);

  res.status(200).send();
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});



