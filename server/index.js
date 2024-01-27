const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connect } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/notes', require('./routes/notes'));

const PORT = process.env.PORT || 4000;
connect().then(() => app.listen(PORT, () => console.log('listening on ' + PORT)));
