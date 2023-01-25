const Pool = require('pg').Pool

const pool = new Pool({
  host: 'localhost',
  port: 5439,
  database: 'todo_dev',
  user: 'postgres',
  password: '123456',
})

module.exports = {
  pool,
}
