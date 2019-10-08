/**
 * Description: File to responsible to back-end connection
 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const localDataBase = require('./config/database');
const morgan = require('morgan');
const cors = require('cors');

mongoose.Promise = global.Promise;

const app = express();


mongoose.connect(localDataBase.local.urlDataBase, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
	.then(() => console.log('DB Connected!'))
	.catch(err => {
		console.log(`DB Connection Error: ${err.message}`);
		process.exit();
	});


const index = require('./routes/index');
const productRouter = require('./routes/product.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

app.use('/api', index);
app.use('/api/', productRouter);

module.exports = app;