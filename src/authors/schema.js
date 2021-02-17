const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const AuthorSchema = new Schema({
  name: String,
  img: String,
  username: String,
  password: String,
});

AuthorSchema.pre("save", async function (next) {
  //pre saving authors data
  const author = this;
  const plainPW = author.password;

  if (author.isModified("password")) {
    // modifying pasword of author
    author.password = await bcrypt.hash(plainPW, 12);
  }
  next();
});

module.exports = model("Author", AuthorSchema);
