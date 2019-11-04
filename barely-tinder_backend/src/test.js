// https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html
// https://stackabuse.com/the-node-js-request-module/

const express = require('express');
require('dotenv').config();

const db = require('./database');
db.initDBConnection();

const app = express();
const port = process.env.PORT || 5000;

// I think I need this to use req.body
app.use(express.json());
app.use('/acct', db.router);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});