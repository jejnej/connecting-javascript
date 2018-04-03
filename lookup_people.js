const pg = require("pg");
const settings = require("./settings");
const[name] = process.argv.slice(2);
if(!name) {
  console.log("Please provide a query")
  return process.exit(1);
}


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});



function findPerson(rows) {

  console.log(`Found ${rows.length} person(s) by the name '${name}':`);
 if(rows.length === 0 ) {
    console.log("Try another search")
  }
  rows.forEach( function(row) {
    const id = row.id;
    const firstName = row.first_name;
    const lastName = row.last_name;
    const birthDate = row.birthdate;

    console.log(`- ${id}: ${firstName} ${lastName}, born '${birthDate.toLocaleDateString()}'`);
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Error connecting", err);
  }
  console.log("Searching ...");
  client.query(`SELECT *
    FROM famous_people
    WHERE first_name LIKE $1::text`, [name], (err, result) => {
    if (err) {
      return console.error("Please try another search", err);
    }

    findPerson(result.rows);
    client.end();
  });
});

