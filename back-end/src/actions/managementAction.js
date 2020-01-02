const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const baseUtilite = require('../utilities/baseUtilite');


exports.login =  async (req, res) => {
    const token = jwt.sign({email: req.body.user.email, userId: req.body.user.uid,},
        baseUtilite.CONSTANTS.JWT_KEY, {expiresIn: '1h'});

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

exports.check = (req, res) => {
    return User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
        res.status(200).send(user);
    })
}


exports.findUsers = (req, res, next) => {
    requireRole(req, 'admin')
    const filter = req.body.filter || ''

    if (!miscUtility.isNullOrWhiteSpace(filter)) {
        admin.database().ref(`/users/${filter}`)
            .once('value')
            .then(snap => {
                if (snap.exists()) {
                    res.status(200).json({ data: [Object.assign({ id: filter }, snap.val())], count: 1 }).end()
                } else {
                    res.status(200).json({ data: [], count: 0 }).end()
                }
            })
            .catch(err => next(err))

        return
    }

    admin.database().ref('/users')
        .once('value')
        .then(snap => {
            const val = snap.val()
            const data = Object.keys(val).map(key => {
                const obj = val[key]
                obj.id = key
                return obj
            })/* .sort((a, b) => {
                return (a.info && b.info) ? a.info.role - b.info.role : -1
            }) */

            let objs = { invalid: [] }
            data.forEach((obj) => {
                if (obj.info) {
                    if (obj.info.role in objs) {
                        objs[obj.info.role].push(obj)
                    } else {
                        objs[obj.info.role] = [obj]
                    }
                } else {
                    objs.invalid.push(obj)
                }
            })

            let finalData = []
            Object.keys(objs).forEach(key => {
                objs[key].sort((a, b) => {
                    if (a.profile && b.profile && a.profile.name) {
                        return a.profile.name.localeCompare(b.profile.name)
                    } else {
                        return -1
                    }
                })

                finalData = finalData.concat(objs[key])
            })

            res.status(200).json({ data: finalData, count: snap.numChildren() }).end()
        })
        .catch(err => next(err))
}

exports.updateUser = (req, res, next) => {
    requireRole(req, 'admin')

    if (miscUtility.isNullOrWhiteSpace(req.params.id)) {
        res.status(400).json({ id: req.trackId, status: 400, success: false, message: 'Sorry, couldn\'t find this user' }).end()
        return
    }

    admin.database().ref(`/users/${req.params.id}`)
        .once('value')
        .then(snap => {
            if (!snap.exists()) {
                res.status(400).json({ id: req.trackId, status: 400, success: false, message: 'Sorry, couldn\'t find this user' }).end()
                return
            }

            snap.ref.update(req.body)
                .then(() => {
                    snap.ref
                        .once('value')
                        .then(result => res.status(200).json({ success: true, message: 'User updated successfully', data: Object.assign({ id: req.params.id }, result.val()) }).end())
                        .catch(err => next(err))
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
}


exports.deleteUser = (req, res) => {
    requireRole(req, 'admin')

    if (miscUtility.isNullOrWhiteSpace(req.params.id)) {
        res.status(400).json({ id: req.trackId, status: 400, success: false, message: 'Sorry, couldn\'t find this user' }).end()
        return
    }

    admin.auth().getUser(req.params.id)
        .then(() => {
            admin.auth().deleteUser(req.params.id)
                .then(() => {
                    res.status(200).json({ success: true, message: 'User deleted successfully' }).end()
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ id: req.trackId, status: 500, success: false, message: 'Sorry, couldn\'t delete this user' }).end()
                })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ id: req.trackId, status: 400, success: false, message: 'Sorry, couldn\'t find this user' }).end()
            return
        })
}

