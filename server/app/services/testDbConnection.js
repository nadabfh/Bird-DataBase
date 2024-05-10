const pg = require('pg');
const connectionConfig = {
  user: "postgres",
  database: "TP4",
  password: "TP4",
  port: 5432,
  host: "127.0.0.1",
  keepAlive: true
};

const pool = new pg.Pool(connectionConfig);
pool.connect((err, client, done) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to database');
    client.query("DELETE FROM Especeoiseau WHERE nomscientifique = 'PasserDomesticus'", (err, res) => {
      done();
      if (err) {
        console.error(err.stack);
      } else {
        console.log(res.rows);
      }
    });
  }
});
