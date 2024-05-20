const express = require("express");
const { userMiddleWare } = require("../middleware/user");
const { Account, User } = require("../db");
const z = require("zod");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router();

accountRouter.get("/balance", userMiddleWare, async (req, res) => {
  const userId = req.body.userId;

  const account = await Account.findOne({
    userId,
  });

  if (!account)
    return res.status(404).json({
      msg: "No account found",
    });

  return res.status(200).json({
    balance: account.balance,
  });
});

const transferInputValidation = z.object({
  to: z.string(),
  amount: z.number(),
});

accountRouter.post("/transfer", userMiddleWare, async (req, res) => {
  const { success } = transferInputValidation.safeParse(req.body);

  if (!success)
    return res.status(411).json({
      msg: "Unprocessable entity",
    });

  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;

  const fromAccount = await Account.findOne({
    userId: req.body.userId,
  }).session(session);

  if (!fromAccount || fromAccount.balance < amount) {
    await session.abortTransaction();

    return res.status(400).json({
      msg: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();

    return res.status(404).json({
      msg: "Account not found",
    });
  }

  await Account.updateOne(
    { userId: req.body.userId },
    { $inc: { balance: -amount } },
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } },
  ).session(session);

  await session.commitTransaction();

  return res.status(200).json({
    msg: "Transfer successful",
  });
});

module.exports = accountRouter;
