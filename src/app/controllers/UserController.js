const { User } = require('../models');

class UserController {
  create (req, res) {
    return res.render('auth/signup');
  }

  async store (req, res) {
    const { body, file: { filename: avatar } } = req;

    await User.create({ ...body, avatar });

    return res.redirect('/');
  }
}

module.exports = new UserController();
