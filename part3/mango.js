const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personPhoneNumber = process.argv[4]

const url = `mongodb+srv://bastibast:${password}@cluster0.ukd8lo6.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    phoneNumber: String,
})

const Person = mongoose.model('persons', personSchema)

mongoose
    .connect(url)
        .then((result) => {
            console.log('connected')

            const person = new Person({
                name: personName,
                phoneNumber: personPhoneNumber,
            })
            return person.save()
        })
        .then(() => {
            console.log(`Added ${personName} number ${personPhoneNumber} to phonebook`)
        }).then(() => {
        Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.phoneNumber}`)
        })
        return mongoose.connection.close()
    })
        .catch((err) => console.log(err))
})

