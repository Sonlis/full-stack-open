import { useState } from 'react'

const Filter = (props) => {
    return (
        <>
            <h2>Filter</h2>
            <input onChange={props.filterNames} />
        </>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.setNewPerson}>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChange}/>
            </div>
            <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
            <div>
                <button type="submit">add</button>
            </div>

        </form>
    )
}

const Persons = (props) => {
    return (
        <>
            {props.persons.map((person) => {
                if (person.name.includes(props.filter)) {
                    return (
                        <p key={person.name}>{person.name} {person.number}</p>
                    )
                }})}
        </>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [filter, setNewFilter] = useState('');
    const filterNames = (event) => setNewFilter(event.target.value);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleNameChange = (event) => setNewName(event.target.value);
    const handleNumberChange = (event) => setNewNumber(event.target.value);

    const setNewPerson = (event) => {
        event.preventDefault();
        if (persons.some(person => person.name === newName)) {
            window.alert(`${newName} is already in the phonebook`)
            return
        }
        const person = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
    }

    return (
      <div>
        <h2>Phonebook</h2>
          <Filter filterNames={filterNames}/>
        <h2>Add a new</h2>
          <PersonForm newName={newName} newNumber={newNumber} setNewPerson={setNewPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
          <Persons persons={persons} filter={filter} />
      </div>
    )
}

export default App
