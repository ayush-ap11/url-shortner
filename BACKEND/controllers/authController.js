const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/User");
const { validateRegister, validateLogin } = require("../utils/validators");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const COOKIE_NAME = "accessToken";

function signToken(user) {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

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

    // set cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true", // set true in prod (https)
      sameSite: process.env.COOKIE_SAMESITE || "lax",
      maxAge: (() => {
        // convert JWT_EXPIRES_IN if '7d' etc -- here simple approach: 7d -> 7*24*3600*1000
        if (JWT_EXPIRES_IN.endsWith("d")) {
          const days = parseInt(JWT_EXPIRES_IN.slice(0, -1), 10);
          return days * 24 * 60 * 60 * 1000;
        }
        return 7 * 24 * 60 * 60 * 1000;
      })(),
    };

    res.cookie(COOKIE_NAME, token, cookieOptions);

    // return safe user info
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
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

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: process.env.COOKIE_SAMESITE || "lax",
      maxAge: (() => {
        if (JWT_EXPIRES_IN.endsWith("d")) {
          const days = parseInt(JWT_EXPIRES_IN.slice(0, -1), 10);
          return days * 24 * 60 * 60 * 1000;
        }
        return 7 * 24 * 60 * 60 * 1000;
      })(),
    };

    res.cookie(COOKIE_NAME, token, cookieOptions);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Server error"] });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  try {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: process.env.COOKIE_SAMESITE || "lax",
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Server error"] });
  }
};

// CURRENT USER (protected)
exports.me = async (req, res) => {
  try {
    // authMiddleware attaches userId to req.userId
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

    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      return res.status(400).json({ errors: ["Failed to get access token"] });
    }

    // Get user info from GitHub
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const githubUser = userResponse.data;

    // Get user email if not public
    let email = githubUser.email;
    if (!email) {
      const emailResponse = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const primaryEmail = emailResponse.data.find((e) => e.primary);
      email = primaryEmail ? primaryEmail.email : emailResponse.data[0].email;
    }

    if (!email) {
      return res.status(400).json({ errors: ["Email not provided by GitHub"] });
    }

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      // Create new user with GitHub data
      user = await User.create({
        name: githubUser.name || githubUser.login,
        email,
        password: await bcrypt.hash(Math.random().toString(36), 12), // Random password
        phone: "", // Optional
      });
    }

    // Generate JWT token
    const token = signToken(user);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: process.env.COOKIE_SAMESITE || "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie(COOKIE_NAME, token, cookieOptions);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
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

    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      }
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      return res.status(400).json({ errors: ["Failed to get access token"] });
    }

    // Get user info from Google
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const googleUser = userResponse.data;

    if (!googleUser.email) {
      return res.status(400).json({ errors: ["Email not provided by Google"] });
    }

    // Find or create user
    let user = await User.findOne({ email: googleUser.email });
    if (!user) {
      // Create new user with Google data
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        password: await bcrypt.hash(Math.random().toString(36), 12), // Random password
        phone: "", // Optional
      });
    }

    // Generate JWT token
    const token = signToken(user);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: process.env.COOKIE_SAMESITE || "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie(COOKIE_NAME, token, cookieOptions);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.status(500).json({ errors: ["Google authentication failed"] });
  }
};
