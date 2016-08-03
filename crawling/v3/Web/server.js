//const cluster = require('./cluster');

const config = {
  port: process.env.PORT || 1000,
  mongoose: {
    db: 'mongodb://localhost:27017/crawl-them-all',
    options: {
      user: '',
      pass: ''
    },
    debug: false
  }
};

const app  = require('./app');

app.start(config);
