const config = {
  app: {
    port: process.env.PORT || 5000,
  },
  db: {
    host: process.env.MYSQL_HOST || "mysql",
    user: process.env.MYSQL_USER || "hoangphuc",
    password: process.env.MYSQL_PASSWORD || "hoangphuc",
    database: process.env.MYSQL_DATABASE || "my_database",
    port: process.env.MYSQL_PORT || 3306,
  },
};

//mysql: 3306
module.exports = config;
