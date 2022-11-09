import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

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
    console.log(props.persons);
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
    const hook = () => {
        personsService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons.data);
            })
    }

    useEffect(hook, [])
    const [persons, setPersons] = useState([]);
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
        const newPerson = {
            name: newName,
            number: newNumber,
        }
        personsService.create(newPerson)
            .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('');
            })
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
