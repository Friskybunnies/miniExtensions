require('dotenv').config();
const express = require("express");
const app = express();
var cors = require('cors');

app.use(cors());

app.use(require('./routes'));

const port = 5000;

app.listen(port, () => console.log(`Server listening on port ${port}!`));