const bcrypt = require('bcrypt');

module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define('User', {
    name: Datatypes.STRING,
    email: Datatypes.STRING,
    avatar: Datatypes.STRING,
    password: Datatypes.VIRTUAL,
    password_hash: Datatypes.STRING,
    provider: Datatypes.BOOLEAN
  }, {
    hooks: {
      beforeSave: async user => {
        const { password } = user;
        if (password) {
          user.password_hash = await bcrypt.hash(password, 8);
        }
      }
    }
  });

  return User;
};
