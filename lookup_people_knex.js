const pg = require("pg");
const settings = require("./settings");
const [name] = process.argv.slice(2);
if (!name) {
  console.log("Please provide a query")
  return process.exit(1);
}

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

function findPerson(rows) {

  console.log(`Found ${rows.length} person(s) by the name '${name}':`);
  if (rows.length === 0) {
    console.log("Try another search")
  }
  rows.forEach(function(row) {
    const id = row.id;
    const firstName = row.first_name;
    const lastName = row.last_name;
    const birthDate = row.birthdate;

    console.log(`- ${id}: ${firstName} ${lastName}, born '${birthDate.toLocaleDateString()}'`);
  });
}

console.log("Searching ...");

// knex.select().from('famous_people')
//   .where('first_name', name)
//   .orWhere('last_name', name)
//   .asCallback(function(err, rows) {
//     if (err) return console.error(err);
//     findPerson(rows);
//   })
//   .finally(function() {
//     knex.destroy();
  // })

// Knex using Promises
knex.select().from('famous_people').where('first_name', name).orWhere('last_name', name)
.then(rows => findPerson(rows))
.catch(err => console.error(err))
.finally(function() {
    knex.destroy();
  })
