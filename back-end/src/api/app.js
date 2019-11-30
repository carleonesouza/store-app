const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('../config/index');

const app = express();

app.set('secretKey', 'nodeRestApi');
const index = require('./routes/apiRoutes');
const appRoutes = require('./routes/appRoutes');

app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

app.use((req, res, next) => {
  req.trackId = req.id;
  res.header('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Session');
    res.statusCode = 200;
    res.end();
    return;
  }

  next();
});

app.use((req, res, next) => {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'),
  (err, decoded) => {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
});


app.use('/api', index);
app.use('/api/', appRoutes);

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
