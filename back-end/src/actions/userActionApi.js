const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); 
const baseUtilite = require('../utilities/baseUtilite');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
   const userlocal = new User(req.body);
   const user = await userlocal
    .save()
    .then(() => { console.log('Product Save Successfully!'); })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  res.status(201).send({ message: 'The product has been created successfully !', user });

};

exports.authenticateUser= async (req, res) => { 
     User.findOne({email: req.body.email})
     .exec()
     .then( user => {
        if (user.length < 1 ) {
           return res.status(401).json({
              message: 'Auth failed'
           });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
             return res.status(401).json({
                message: 'Auth failed'
             });
          }
          if (result) {
             const token = jwt.sign({
                email: user[0].email,
                userId: user[0]._id
             }, baseUtilite.CONTANTS.JWT_KEY, {
                expiresIn: '1h'
             });
            res.status(200).json({
               message: 'Auth Successful',
               token: token
            });
          }
          res.status(401).json({
             message: 'Auth failed'
          });
        });
     })
     .catch();
   }
