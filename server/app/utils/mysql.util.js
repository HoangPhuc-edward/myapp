const mysql = require("mysql2/promise");
const config = require("../config");

// Tạo pool kết nối với MySQL
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,
  multipleStatements: true,
});

// Kiểm tra xem pool có kết nối được không
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database.");
    connection.release();
  })
  .catch((error) => {
    console.error("Error connecting to MySQL:", error);
    process.exit(1);
  });

module.exports = pool;
