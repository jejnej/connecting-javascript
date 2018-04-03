const pg = require("pg");
const settings = require("./settings");// Update with your config settings.


module.exports = {
  development: {
   client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
    }
  },
};
