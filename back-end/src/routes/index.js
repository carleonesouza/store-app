/**
 * Description: File responsible to call the application class
 */

const express = require('express');
const db = require('../app').myDataBase;
const router = express.Router();

// Reuse database object in request handlers
router.get("/", (req, res) => {
	res.status(200).send({
		success: true,
		message: 'API Connected successfully!'
	})
});

module.exports = router;