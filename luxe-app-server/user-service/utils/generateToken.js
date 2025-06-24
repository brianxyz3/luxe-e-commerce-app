const jwt = require("jsonwebtoken");
const jwtToken = process.env.JWT_TOKEN_SECRET;


module.exports = (email) => jwt.sign({ id: email }, jwtToken);