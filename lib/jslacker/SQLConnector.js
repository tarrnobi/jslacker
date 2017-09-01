const dotenv = require('dotenv')
const sql = require('mssql')
dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port:process.env.DB_PORT,
  database: process.env.DB_DATABASE,

  options: {
    encrypt: false // Use this if you're on Windows Azure
  }
}

function query(statement, parameters){
  return sql.connect(config).then(pool =>{
    let request = pool.request();
    if (parameters){
      for (var param of parameters){
        request.input(param.name, param.type, param.value);
      }
    }
    return request.query(statement);
  }).then(results =>{
    sql.close();
    return results.recordset;
  }).catch(error =>{
    sql.close();
    throw(error);
  });
}
exports.query = query;
