const express = require("express");
const { User, Account } = require("../db");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
const zod = require("zod");

const {
  userMiddleWare,
  createHash,
  validatePassword,
} = require("../middleware/user");

const signupSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const success = signupSchema.safeParse(req.body);

  if (!success.success) {
    return res.status(422).json({
      msg: "Unprocessable entity",
    });
  }

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    return res.status(422).json({
      msg: "User already exists",
    });
  }

  const passwordHash = await createHash(password);

  const user = await User.create({
    email,
    name,
    password_hash: passwordHash,
  });

  await Account.create({
    userId: user._id,
    balance: 100 + Math.round(Math.random() * 10000),
  });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    secretKey,
  );

  res.status(200).json({
    msg: "User created",
    token,
  });
});

const signinSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
});

userRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const success = signinSchema.safeParse(req.body);

  if (!success.success) {
    return res.status(422).json({
      msg: "Unprocessable entity",
    });
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  const isPasswordValid = await validatePassword(password, user.password_hash);

  if (!isPasswordValid) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    secretKey,
  );

  return res.status(200).json({
    token,
  });
});

const updateSchema = zod.object({
  name: zod.string().optional(),
  password: zod.string().optional(),
});

userRouter.put("/update", userMiddleWare, async (req, res) => {
  const userId = req.body.userId;

  const { success } = updateSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      msg: "Unprocessable entity",
    });
  }

  if (!!req.body.password) {
    const password_hash = await createHash(req.body.password);

    req.body.password_hash = password_hash;
  }

  await User.findByIdAndUpdate(
    {
      _id: userId,
    },
    req.body,
  );

  return res.status(200).json({
    msg: "Updated successfully",
  });
});

userRouter.get("/bulk", userMiddleWare, async (req, res) => {
  const filterQuery = req.query.filter || "";

  const users = await User.find({
    name: {
      $regex: filterQuery, // to search string that has the filterQuery substring
      $options: "i", // case insensitive search
    },
  });

  return res.status(200).json({
    data: users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
      };
    }),
  });
});

userRouter.get("/one/:userId", userMiddleWare, async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  return res.status(200).json({
    name: user.name,
    email: user.email,
    id: user._id,
  });
});

userRouter.get("/me", userMiddleWare, async (req, res) => {
  const userId = req.body.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const userAccount = await Account.findOne({
    userId,
  });

  if (!userAccount) {
    return res.status(404).json({ msg: "User not found" });
  }

  return res.status(200).json({
    name: user.name,
    email: user.email,
    id: user._id,
    balance: userAccount.balance,
  });
});

module.exports = userRouter;
