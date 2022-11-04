import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('');

    const handleNameChange = (event) => setNewName(event.target.value);

    const setNewPerson = (event) => {
        event.preventDefault();
        const person = {
            name: newName
        }
        setPersons(persons.concat(person))
        setNewName('')
    }
    return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={setNewPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <>
            {persons.map((person) => <p key={person.name}>{person.name}</p>)}
        </>
      </div>
    )
}

export default App