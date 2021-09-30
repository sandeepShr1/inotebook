var jwt = require('jsonwebtoken');
const JWT_SECRET = "hero@123";

const fetchuser = (req, res, next) => {
    // Get a user from the JWT and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please Authenticate" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;s

    } catch (error) {
        res.status(401).send({ error: "Please Authenticate" });
    }
    next();
}

module.exports = fetchuser;