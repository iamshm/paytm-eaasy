const mongoose = require("mongoose");
const { MONGO_URL } = require("./env");

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err));

const UserShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: String,
  password_hash: String,
});

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", UserShema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = {
  User,
  Account,
};
