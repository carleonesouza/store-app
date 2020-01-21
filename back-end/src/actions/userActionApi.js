const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const baseUtilite = require('../utilities/baseUtilite');
const userUtilite = require('../utilities/userUtility');

exports.createUser = async (req, res) => {
  User.findOne({ email: req.body.username })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: 'Mail exists',
        });
      } else {
        const userlocal = new User(req.body);
            userlocal.save()
              .then((user) => { res.status(201).send(user);})
              .catch((err) => {
                res.status(500).json({
                  message: err,
                });
              });
          }     
    });
}

exports.authenticateUser = async (req, res) => {
  return User.findOne({ email: req.body.username })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        
        if (result && req.body.accessToken === user.accessToken) {
            const token = jwt.sign({
              email: user.email,
              userId: user._id,
            }, baseUtilite.CONSTANTS.JWT_KEY, {
              expiresIn: '1h'});
              user.token = token;
            res.status(200).json(token);
        } else { res.status(401).json({ message: 'Auth failed',});
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
}

exports.findAllUsers = async (req, res) => {
  const users = await User.find({});
 return res.status(200).send(users);
}

exports.findUserById = async (req, res) => {
  const user = await User.findOne({username: req.body.email});
  res.status(200).send(user);
}


