const albums = require('./routes/albums');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/albums', albums);

const port = process.env.PORT || 3001;
app.listen(port, console.log(`Listening on port ${port}`));