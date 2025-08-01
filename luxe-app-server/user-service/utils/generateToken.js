const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_TOKEN_SECRET;


module.exports = (email, userRole) => {
    if (userRole.toLowerCase() === "admin") return jwt.sign({ id: email, perm: userRole }, jwtSecret, {expiresIn: "2h"});
    jwt.sign({ id: email, perm: userRole }, jwtSecret, { expiresIn: "10d" });
}