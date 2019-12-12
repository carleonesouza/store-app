const express = require('express');
const config = require('../config/index');
const expressJwt = require('express-jwt');
const baseUtilite = require('../utilities/baseUtilite');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

const allowCrossDomain = function(req, res, next) {
  res.header('Content-Type', 'application/vnd.api+json');
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

app.use(allowCrossDomain);

app.use('/api/management', require('./routes/apiRoutes'));
app.use('/api/management', require('./routes/appRoutes'));

app.use(expressJwt({secret: baseUtilite.CONSTANTS.JWT_KEY}).unless({path: ['/api/management/login']}));


// Basic 404 handler
app.use((req, res) => {
  res.status(404).json({ id: req.trackId, status: 404, message: 'Not found' }).end();
});

// Basic error handler
app.use((err, req, res) => {
  if (err.status && err.status < 500) {
    res.status(err.status).json(err).end();
  } else {
    res.status(500).json({ id: req.trackId, status: 500, message: 'Internal server error' }).end();
  }
});


module.exports = app;
