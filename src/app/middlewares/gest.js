module.exports = ({ session }, res, next) => {
  if (session && !session.user) {
    return next();
  }

  return res.redirect('/app/dashboard');
};
