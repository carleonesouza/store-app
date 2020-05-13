const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const baseUtilite = require('../utilities/baseUtilite');


exports.login =  async (req, res) => {
    const token = jwt.sign({email: req.body.user.email, userId: req.body.user.uid,},
        baseUtilite.CONSTANTS.JWT_KEY,);

    userSession = await User.updateOne({email: req.body.user.email}, { 
         accessToken: token
     })
       .then(() => console.log('Auth Successfully'))
       .catch((err) => {
            res.status(500).json({
                message: err,
            });
        });

    return User.findOne({ email: req.body.user.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      } else {
          return res.status(200).json(user);
      }
      
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });

       
}

exports.logout = (req, res) => {
    User.updateOne({email: req.body.email}, {
        accessToken: null,
    }, err => {
        if (err) {
            console.log(err)
            res.status(500).json({ id: req.trackId, status: 500, success: false, message: 'Sorry, an error ocurred while processing your request' }).end()
            return
        }

        res.status(200).json({ id: req.trackId, status: 200, success: true, message: 'See you later!' }).end()
    })

}

exports.check = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
        .exec();
    res.status(200).send(user);
}


