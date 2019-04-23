const express = require('express');

const multerConfig = require('./config/multer');
const upload = require('multer')(multerConfig);
const authMiddleware = require('./app/middlewares/auth');
const gestMiddleware = require('./app/middlewares/gest');

const routes = express.Router();
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

routes.get('/', gestMiddleware, SessionController.create);
routes.post('/signin', SessionController.store);

routes.get('/signup', gestMiddleware, UserController.create);
routes.post('/signup', upload.single('avatar'), UserController.store);

routes.use('/app', authMiddleware);
routes.get('/app/logout', SessionController.destroy);
routes.get('/app/dashboard', (req, res) => {
  console.log('>>', req.session.user);
  return res.render('dashboard');
});

module.exports = routes;
