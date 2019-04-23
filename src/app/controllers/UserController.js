const { User } = require('../models');

class UserController {
  create (req, res) {
    return res.render('auth/signup');
  }

  async store (req, res) {
    try {
      const { body, file: { filename: avatar } } = req;

      await User.create({ ...body, avatar });

      return res.redirect('/');
    } catch (e) {
      // @TODO: improve error messages
      console.error({ e });
      req.flash('error', 'Ocorreu um erro :p');
      return res.redirect('/signup');
    }
  }
}

module.exports = new UserController();
