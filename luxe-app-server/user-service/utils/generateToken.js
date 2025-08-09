const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_TOKEN_SECRET;


module.exports = (id, email, userRole, ) => {
    if (userRole.toLowerCase() !== "customer") return jwt.sign({ id, email, userRole,  }, jwtSecret, {expiresIn: "2h"});
    jwt.sign({ id, email, userRole }, jwtSecret, { expiresIn: "10d" });
}