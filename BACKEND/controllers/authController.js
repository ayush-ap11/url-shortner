const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { validateRegister, validateLogin } = require("../utils/validators");
const {
  signToken,
  setAuthCookie,
  clearAuthCookie,
  formatUserResponse,
} = require("../utils/authHelpers");
const {
  getGithubAccessToken,
  getGithubUser,
  getGoogleAccessToken,
  getGoogleUser,
} = require("../utils/oauthHelpers");
const { findOrCreateOAuthUser } = require("../utils/userHelpers");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const errors = validateRegister({ name, email, password, phone });
    if (errors.length) return res.status(400).json({ errors });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ errors: ["Email already in use."] });

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, phone, password: hash });
    const token = signToken(user);

    setAuthCookie(res, token);
    res.status(201).json({ user: formatUserResponse(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Server error"] });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validateLogin({ email, password });
    if (errors.length) return res.status(400).json({ errors });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ errors: ["Invalid credentials"] });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ errors: ["Invalid credentials"] });

    const token = signToken(user);
    setAuthCookie(res, token);
    res.json({ user: formatUserResponse(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Server error"] });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  try {
    clearAuthCookie(res);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Server error"] });
  }
};

// CURRENT USER (protected)
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ errors: ["User not found"] });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Server error"] });
  }
};

// GITHUB OAUTH CALLBACK
exports.githubCallback = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ errors: ["Authorization code required"] });
    }

    const accessToken = await getGithubAccessToken(code);
    if (!accessToken) {
      return res.status(400).json({ errors: ["Failed to get access token"] });
    }

    const githubUserData = await getGithubUser(accessToken);
    const user = await findOrCreateOAuthUser(githubUserData);

    const token = signToken(user);
    setAuthCookie(res, token);
    res.json({ user: formatUserResponse(user) });
  } catch (err) {
    console.error("GitHub OAuth error:", err);
    res.status(500).json({ errors: ["GitHub authentication failed"] });
  }
};

// GOOGLE OAUTH CALLBACK
exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ errors: ["Authorization code required"] });
    }

    const accessToken = await getGoogleAccessToken(code);
    if (!accessToken) {
      return res.status(400).json({ errors: ["Failed to get access token"] });
    }

    const googleUserData = await getGoogleUser(accessToken);
    const user = await findOrCreateOAuthUser(googleUserData);

    const token = signToken(user);
    setAuthCookie(res, token);
    res.json({ user: formatUserResponse(user) });
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.status(500).json({ errors: ["Google authentication failed"] });
  }
};
