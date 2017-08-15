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
console.dir("hello")
sql.connect(config).then(pool =>{
  return pool.request().query('select top 10 * from sys.tables')
}).then(result =>{
  console.dir(result)
})
