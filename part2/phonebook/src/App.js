import { useState, useEffect } from 'react'
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
    return (
        <>
            {props.persons.map((person) => {
                if (person.name.includes(props.filter)) {
                    return (
                        <>
                            <p key={person.name}>{person.name} {person.number}</p>
                            <button key={person.id} onClick={() => props.removeUser(person)}>delete</button>
                        </>
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

    const removeUser = (personToRemove) => {
        if (window.confirm(`remove user ${personToRemove.name} ?`)) {
            personsService.remove(personToRemove.id)
                .then(response => {
                    personsService.getAll()
                        .then( response => {
                            setPersons(response.data)
                            }
                        )
                    }
            )
        }
    }

    const setNewPerson = (event) => {
        event.preventDefault();
        let exist = false;
        persons.forEach(person => {
            if (person.name === newName) {
                if (window.confirm(`User ${person.name} is already in the phonebook, replace their number?`)) {
                    exist = true;
                    personsService.put(newName, newNumber, person.id)
                        .then( response => {
                            personsService.getAll()
                                .then( response => {
                                    setPersons(response.data)
                                    setNewName('')
                                    setNewNumber('')
                                })
                            }
                        )
                }
            }
        })
        if (exist) {
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
          <Persons persons={persons} filter={filter} removeUser={removeUser}/>
      </div>
    )
}

export default App
