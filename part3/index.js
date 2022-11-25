const express = require('express')
const {request} = require("express");
const cors = require('cors')
const app = express()
const morgan = require('morgan')
morgan.token('type', function (req, res) { return req.body })

app.use(express.json())
app.use(express.static('build'))
app.use(morgan('combined', 'tiny'))
app.use(cors())

const Person = require('./models/person')

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const now = new Date();
    response.send(`<p>Phonebook has info for ${people} people</p><p>${now}</p>`);
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    data = data.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    const person = new Person
    ({
        name: body.name,
        phoneNumber: body.number
    })
    person.save().then(savedPerson => {
            response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
