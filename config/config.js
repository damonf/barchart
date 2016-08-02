var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    port: process.env.PORT || 3000,
  },

  production: {
    port: process.env.port
  }
};

module.exports = config[env];
