const mongoose = require('mongoose');
const baseUtilite = require('../utilities/baseUtilite');


mongoose.Promise = global.Promise;

mongoose.connect(baseUtilite.CONSTANTS.DATABASE, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
})
  .then(() => (
    console.log('DB connection was successfully!!')))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
    process.exit();
  });
