import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
    ])
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
        <form onSubmit={setNewPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
          </div>
            <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
          <div>
            <button type="submit">add</button>
          </div>

        </form>
        <h2>Numbers</h2>
        <>
            {persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
        </>
      </div>
    )
}

export default App
