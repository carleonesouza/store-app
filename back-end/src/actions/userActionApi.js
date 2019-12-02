const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const baseUtilite = require('../utilities/baseUtilite');

exports.createUser = async (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: 'Mail exists',
        });
      }
      bcrypt.genSalt(baseUtilite.CONSTANTS.SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
          return err;
        }
        // hash the password using our new salt
        // eslint-disable-next-line no-shadow
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            return res.status(409).json({
              message: err
            });
          } else {
            const userlocal = new User(req.body);
            userlocal.password = hash;
            userlocal
              .save()
              .then(() => { console.log('User Save Successfully!'); })
              .catch((err) => {
                res.status(500).json({
                  message: err,
                });
              });
            res.status(201).send({ message: 'The User has been created successfully !' });

          }
          return null;
        });
        return null;
      });
    });
}

exports.authenticateUser = async (req, res) => {
  return User.findOne({ email: req.body.email })
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
        if (result) {
          const token = jwt.sign({
            email: user.email,
            userId: user._id,
          }, baseUtilite.CONSTANTS.JWT_KEY, {
            expiresIn: '1h',
          });
          res.status(200).json({
            message: 'Auth Successful'
          });
        } else {
          res.status(401).json({
            message: 'Auth failed',
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
}
