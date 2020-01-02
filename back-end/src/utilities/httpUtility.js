const jwt = require('jsonwebtoken');
const baseUtilite = require('../utilities/baseUtilite');

exports.checkAuth = (req, res, next) => {
    console.log(req.headers.authorization);
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        res.status(403).json({ message: "Unauthorized" }).end();
        return;
    }

    const idToken = req.headers.authorization.split('Bearer ')[1];
    console.log(idToken);
    jwt.verify(idToken, baseUtilite.CONSTANTS.JWT_KEY, (error, decoded) => {
                if (error) {
                    res.status(403).json({ message: "Unauthorized" });
                    return;
                } else {
                    req.user = decoded
                    next();
                }
            });
};


exports.isNullOrWhiteSpace = (input) => {
    if (typeof input === 'undefined' || input == null || input == '') return true;
    return (typeof input === 'string') ? input.replace(/\s/g, '').length < 1 : false;
};
