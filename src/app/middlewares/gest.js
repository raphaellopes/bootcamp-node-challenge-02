module.exports = ({ session }, res, next) => {
  if (session && !session.user) {
    return next();
  }

  const { user } = session;
  const view = user.provider ? `appointments/${user.id}` : 'dashboard';
  return res.redirect(`/app/${view}`);
};
