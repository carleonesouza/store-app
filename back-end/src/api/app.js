const express = require('express');
const config = require('../config/index');
const expressJwt = require('express-jwt');
const baseUtilite = require('../utilities/baseUtilite');
const httpUtilite = require('../utilities/httpUtility');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

app.use((req, res, next) => {
  req.trackId = req.id;
  res.header('Content-Type', 'application/vnd.api+json');
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); 


  if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Session');
      res.statusCode = 200;
      res.end();
      return;
  }
  next();
})


app.use('/api/management', require('./routes/apiRoutes'));
app.use('/api/management', httpUtilite.checkAuth, require('./routes/appRoutes'));
app.use('/api/management', (req, res, next) => {
  if (req.url === '/account/login') {
      next()
      return
  }

  const sessionId = req.header('Session')
  const errObj = { id: req.trackId, status: 403, message: 'You must be logged in to view this page' }

  if (httpUtilite.isNullOrWhiteSpace(sessionId)) {
      res.status(403).json(errObj).end()
      return
  }
  next();

});



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
