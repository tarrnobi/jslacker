const dotenv = require('dotenv');
const sql = require('mssql');

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,

  options: {
    encrypt: false, // Use this if you're on Windows Azure
  },
};
const connectionPool = new sql.ConnectionPool(config);

async function closeConnection() {
  if (connectionPool.connected) {
    await connectionPool.close();
  }
}
async function openConnection() {
  if (!connectionPool.connected) {
    await connectionPool.connect();
  }
}

async function query(statement, parameters) {
  const request = connectionPool.request();
  if (parameters) {
    parameters.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });
  }
  await openConnection();
  const response = await request.query(statement);
  return response.recordset;
}

exports.query = query;
exports.closeConnection = closeConnection;
exports.openConnection = openConnection;
exports.connectionPool = connectionPool;
