// dependencies
const express = require('express')
const app = express();
const bodyParser = require('body-parser');

app.use(
    session({
      secret: 'arbitary-string',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    })
  );

// instatations

// configurations

// middleware
// To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// To parse json data
app.use(bodyParser.json())

// routes


app.listen(3000, () => console.log('listening on port 3000')); 
