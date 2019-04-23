module.exports = ({ session }, res, next) => {
  if (session && session.user) {
    //  set to all app the user info
    res.locals.user = session.user;
    return next();
  }

  return res.redirect('/');
};
