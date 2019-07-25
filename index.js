const express = require('express')

const Users = require('./data/db.js')

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({
            errorStatus: 'The users information could not be retrieved.'
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                errorStatus: 'The user information could not be retrieved.'
            })
        })
})

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    if (!name || !bio) {
        res
            .status(400)
            .json({
                errorStatus: 'Please enter a name and a bio.'
            })
    } else {
        Users.insert(req.body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(() => {
                res.status(500).json({
                    errorStatus: 'User was not saved to database.'
                })
            })
    }
})

server.delete('/api/users/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(count => {
            if (count && count > 0) {
                res.status(200).json({
                    message: 'the user was deleted.'
                })
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                errorStatus: 'The user could not be removed'
            })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body

    if (!name || !bio) {
        res.status(400).json({
            errorStatus: 'Please provide name and bio for the user.'
        })
    } else {
        Users.update(req.params.id, req.body)
            .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(() => {
          res.status(500).json({
            errorStatus: 'The user information could not be modified.'
          })
        })
    }
  })

  const port = 5000
  server.listen(port, () => console.log(`Server listening on port ${port}`))