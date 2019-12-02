const jwt = require('jsonwebtoken');
const baseUtilite = require('../utilities/baseUtilite');

module.exports.checkAuth = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        res.status(403).json({ message: "Unauthorized" }).end();
        return;
    }

    const idToken = req.headers.authorization.split("Bearer ")[1];
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

