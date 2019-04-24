// vendors
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const nunjucks = require('nunjucks');
const path = require('path');
const flash = require('connect-flash');

// local
const routes = require('./routes');

class App {
  constructor () {
    this.express = express();
    this.isDev = process.env.NODE_ENV || true;
    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(flash());

    // @TODO: Remove the secret from js file.
    //        Never let this information exposed like this file
    this.express.use(session({
      name: 'root',
      secret: 'MyAppSecret',
      resave: true,
      store: new FileStore({
        path: path.resolve(__dirname, '..', 'tmp', 'sessions')
      }),
      saveUninitialized: false
    }));
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoscape: true
    });

    this.express.use(express.static(path.resolve(__dirname, 'public')));
    this.express.set('view engine', 'njk');
  }

  routes () {
    this.express.use(routes);
  }
}

module.exports = new App().express;
