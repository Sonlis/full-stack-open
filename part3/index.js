const express = require('express')
const {request} = require("express");
const cors = require('cors')
const app = express()
const morgan = require('morgan')
morgan.token('type', function (req, res) { return req.body })

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(express.json())
app.use(express.static('build'))
app.use(morgan('combined', 'tiny'))
app.use(cors())
app.use(errorHandler)

const Person = require('./models/person')

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    const now = new Date();
    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${now}</p>`);
    })
    .catch(error => next(error))

})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(note => {
        response.json(note)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        phoneNumber: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
            })
        .catch(error => next(error))

    response.status(204).end()
})

app.post('/api/persons', (request, response, next) => {
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
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
