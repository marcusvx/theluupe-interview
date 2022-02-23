const sessionOptions = {
  cookieName: 'theluupe/auth',
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

module.exports = {
  sessionOptions,
};
