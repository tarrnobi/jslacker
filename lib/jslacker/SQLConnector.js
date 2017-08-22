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
export function helloWorld(){
  return sql.connect(config).then(pool =>{
    const request = pool.request()
    return request.query("SELECT A = 'Hello World'");
  }).then(results =>{
    sql.close();
    return results;
  })

}
export function dummyQuery(){
  return sql.connect(config).then(pool =>{
    const request = pool.request()
    return request.query("SELECT Year = '1986', Age='0'");
  }).then(results =>{
    sql.close();
    return results;
  });
}

export function query(statement, parameters){

}
