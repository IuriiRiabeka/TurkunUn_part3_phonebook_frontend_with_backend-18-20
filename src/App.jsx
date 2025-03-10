
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([
   
  ]) 
  const [actionMessage, setActionMessage] = useState('No action yet...')
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data) 
      })
  }, [])
  

  

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
console.log({persons}.persons.map(person => person.name));
console.log({filter}.filter);
const handleNameChange = (event) => {
  setNewName(event.target.value)
}
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}
const handleFilterChange = (event) => {
  setFilter(event.target.value)
  setActionMessage(`Filtering for ${event.target.value}`)
  setTimeout(() => {
    setActionMessage(null)
  }, 5000)
}
const addPerson = (event) => {
  event.preventDefault()
  if (persons.some(person => person.name === newName)) {
    alert(`${newName} is already added to phonebook`)
    return 
  }
  const personObject = {
    
    name: newName,
    number:newNumber
  }
   
    personService
    .create(personObject)
    .then(response => {
      console.log(response)
    })
  setPersons(persons.concat(personObject))
  setNewName('')
  setNewNumber('')
  setActionMessage(`Added ${newName}`)
  setTimeout(() => {
    setActionMessage(null)
  }, 5000)
 
}
const personsToShow = filter
? persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  ) 

: persons

const deletePerson = (id, name) => {
  if (!id) {
    console.error("Error: person id is undefined!");
    return;
  }
  if (window.confirm(`Delete ${name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      setActionMessage(`Deleted ${name}`)
      setTimeout(() => {
        setActionMessage(null)
      }, 5000)
      .catch(error => {
        console.error("Error deleting person:", error);
      });
  }
};

  return (
    <div>
      <h1>Phonebook</h1>
<Notification message={actionMessage} />
      
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
     
      
      <PersonForm newName={newName} handleNameChange={handleNameChange}
       newNumber={newNumber} handleNumberChange={handleNumberChange} 
        addPerson={addPerson}/>
        <Persons personsToShow={personsToShow} deletePerson={deletePerson} />

     
    </div>
  )
}

export default App