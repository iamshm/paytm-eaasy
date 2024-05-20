const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
const bycrypt = require("bcrypt");

const userMiddleWare = (req, res, next) => {
  const authToken = req.headers.authorization;

  const token = authToken.split(" ")[1];
  const verify = jwt.verify(token, secretKey);

  if (!verify) {
    res.status(403).json({
      msg: "Unauthorized",
    });
  }

  req.body["userId"] = verify.userId;

  next();
};

const createHash = async (plainPassword) => {
  const salt = await bycrypt.genSalt(10);

  return await bycrypt.hash(plainPassword, salt);
};

const validatePassword = async (attemptedPassword, existingPassHash) => {
  return await bycrypt.compare(attemptedPassword, existingPassHash);
};

module.exports = {
  userMiddleWare,
  createHash,
  validatePassword,
};
