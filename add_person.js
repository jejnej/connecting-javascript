const pg = require("pg");
const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

let firstName = process.argv[2];
let lastName = process.argv[3];
let birthDate = process.argv[4];

knex('famous_people').insert({'first_name': firstName, 'last_name': lastName, 'birthdate': birthDate})
.finally(function() {
  knex.destroy();
})



