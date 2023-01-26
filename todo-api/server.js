const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function(_, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  next();
});


// Get all tasks
app.get('/tasks', function (_, res) {
  db.pool.query('select id, content, done from todo.tasks order by id', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})


// Get task by ID
app.get('/tasks/:id', function (req, res) {
  const id = parseInt(req.params.id)

  db.pool.query('select id, content, done from todo.tasks where id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})


// Create task
app.post('/tasks', function (req, res) {
  const { content, done } = req.body

  db.pool.query(
    'insert into todo.tasks (content, done) VALUES ($1, $2) returning id, content, done',
    [content, done], 
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).json(results.rows[0])
    }
  )
})


// Update task
app.put('/tasks/:id', function (req, res) {
  const id = parseInt(req.params.id)
  const { content, done } = req.body

  db.pool.query(
    'update todo.tasks set content = $1, done = $2 where id = $3',
    [content, done, id],
    (error) => {
      if (error) {
        throw error
      }
      res.status(204).send()
    }
  )
})


// Delete task
app.delete('/tasks/:id', function (req, res) {
  const id = parseInt(req.params.id)

  db.pool.query(
    'delete from todo.tasks where id = $1',
    [id],
    (error) => {
      if (error) {
        throw error
      }
      res.status(204).send()
    }
  )
})


app.listen(3000)
