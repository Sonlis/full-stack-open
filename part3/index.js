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

let data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(data);
})

app.get('/info', (request, response) => {
    const people = data.length;
    const now = new Date();
    response.send(`<p>Phonebook has info for ${people} people</p><p>${now}</p>`);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = data.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }})

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
    if (data.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name already exists'
        })
    }
    const person = {
        id: Math.random() * 1000,
        name: body.name,
        number: body.number
    }
    data = data.concat(person);
    response.json(person)});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
