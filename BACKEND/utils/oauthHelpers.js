const axios = require("axios");

/**
 * Exchange GitHub authorization code for access token
 */
async function getGithubAccessToken(code) {
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    { headers: { Accept: "application/json" } }
  );

  return response.data.access_token;
}

/**
 * Fetch GitHub user info using access token
 */
async function getGithubUser(accessToken) {
  const userResponse = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  let email = userResponse.data.email;

  // Get user email if not public
  if (!email) {
    const emailResponse = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const primaryEmail = emailResponse.data.find((e) => e.primary);
    email = primaryEmail ? primaryEmail.email : emailResponse.data[0]?.email;
  }

  return {
    name: userResponse.data.name || userResponse.data.login,
    email,
  };
}

/**
 * Exchange Google authorization code for access token
 */
async function getGoogleAccessToken(code) {
  const response = await axios.post("https://oauth2.googleapis.com/token", {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  });

  return response.data.access_token;
}

/**
 * Fetch Google user info using access token
 */
async function getGoogleUser(accessToken) {
  const response = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return {
    name: response.data.name,
    email: response.data.email,
  };
}

module.exports = {
  getGithubAccessToken,
  getGithubUser,
  getGoogleAccessToken,
  getGoogleUser,
};
