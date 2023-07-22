const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 8080;

// init morgan middleware
app.use(morgan('dev'));

// init express middleware for JSON parsing
app.use(express.json());

// init cors
app.use(cors());

// hello world route
app.get('/hello-world', (req, res) => {
    res.send('Hello World!');
});

// init server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
