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
sql.connect(config).then(pool =>{
  // return pool.request().query('select top 10 * from sys.tables')
  const request = pool.request()
  request.on('info', info=>{
    console.dir(info)
  })
  // request.on('error', error=>{
  //   console.dir(error)
  // })
  return request.query("PRINT 'Hello World';RAISERROR('This is an error', 16,1)")
}).then(result =>{
  console.dir(result)
}).catch(result =>{
  console.dir(result)
})
// .then(() =>{
//   process.exit()
// })
// process.exit()
// node .\lib\helpers\sql_connector.js
