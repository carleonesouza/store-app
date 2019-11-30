const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); 
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
      User.findOne({email:req.body.email}, (err, userInfo) => {
         if (err) {
                  next(err);
         } else {
               if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                  const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                  res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
               } else {
                  res.json({status:"error", message: "Invalid email/password!!!", data:null});
                  }
               }
            });
         }
