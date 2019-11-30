const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

}

exports.findUser = async (req, res) => {
    User.schema.pre()
}