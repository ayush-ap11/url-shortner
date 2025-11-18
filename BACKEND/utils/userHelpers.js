const bcrypt = require("bcryptjs");
const User = require("../models/User");

/**
 * Find user by email or create new OAuth user
 */
async function findOrCreateOAuthUser({ name, email }) {
  if (!email) {
    throw new Error("Email not provided by OAuth provider");
  }

  let user = await User.findOne({ email });

  if (!user) {
    const randomPassword = await bcrypt.hash(Math.random().toString(36), 12);
    user = await User.create({
      name,
      email,
      password: randomPassword,
      phone: "",
    });
  }

  return user;
}

module.exports = {
  findOrCreateOAuthUser,
};
