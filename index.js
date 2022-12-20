const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

app.get('/api/:column', (req, res) => {
  const column = req.params.column;

  // Connect to the database
  const connection = mysql.createConnection({
    host: 'host_ip',
    user: 'user',
    password: 'password',
    database: 'db'
  });
  connection.connect();

  // Construct the SQL query
  const query = `SELECT * FROM PMT_PMT_VPS_REQ where APP_NUMBER= ${connection.escape(req.params.column)}`;

  console.log(query);


  // Execute the query
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result.length>0?result[0]:null);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

});