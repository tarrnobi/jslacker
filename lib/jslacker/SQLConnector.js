const dotenv = require('dotenv');
const sql = require('mssql');
const DOMParser = require('xmldom').DOMParser;

dotenv.config();

const ResponseType = {
  RECORDSET: 0,
  XML: 1,
};

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
const transaction = connectionPool.transaction();
/*
  We can check if a transaction is actually in transaction
  by looking for Object.keys(t._acquiredConnection).
  Probably not the best thing to be looking for as it seems
  to be a private member.

  We could always just try to begin an already begun transaction
  and capture whether it fails or not as a secondary way of doing it.
*/
function isInTransaction() {
  if (Object.prototype.hasOwnProperty.call(transaction, '_acquiredConnection')) {
    /* eslint-disable no-underscore-dangle */
    if (transaction._acquiredConnection) {
      return transaction._acquiredConnection.inTransaction;
    }
    /* eslint-enable no-underscore-dangle */
  }
  return false;
}
async function beginTransaction() {
  if (!isInTransaction()) {
    await transaction.begin();
  }
}

async function rollbackTransaction() {
  if (isInTransaction()) {
    await transaction.rollback();
  }
}
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

function prepareResponseType(response, responseType) {
  if (responseType === ResponseType.XML) {
    const results = response.recordset;
    const innerXML = results[0][Object.keys(results[0])];
    return new DOMParser().parseFromString(innerXML);
  }
  return response.recordset;
}

async function query(statement, parameters, responseType = null) {
  const request = isInTransaction() ? transaction.request() : connectionPool.request();
  if (parameters) {
    parameters.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });
  }
  await openConnection();
  const response = await request.query(statement);
  return prepareResponseType(response, responseType);
}

exports.query = query;
exports.closeConnection = closeConnection;
exports.openConnection = openConnection;
exports.connectionPool = connectionPool;
exports.beginTransaction = beginTransaction;
exports.rollbackTransaction = rollbackTransaction;
exports.isInTransaction = isInTransaction;
exports.prepareResponseType = prepareResponseType;
exports.ResponseType = ResponseType;
