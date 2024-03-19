import { useState } from 'react'
import FilterInput from './modules/filterInput';
import ContactList from './modules/contactList';
import ContactForm from './modules/contactForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newContact, setNewContact] = useState({name: '', number: null, id: undefined})
  const [filter, setFilter] = useState('');
  
  const onNameHandler = (event) => {
    const value = event.target.value;
    const newId = persons.length + 1;
    setNewContact({...newContact, name: value, id: newId})

    console.log(newContact)
  }

  const onNumberHandler = (event) => {
    const value = event.target.value;
    const newId = persons.length + 1;
    setNewContact({...newContact, number: value, id: newId})

    console.log(newContact)
  }

  const onFilterHandler = (event) => {
    
    const value = event.target.value;
    console.log(value)
    setFilter(value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()


    if(!isNaN(newContact.name)) return alert('Name cant be only numbers')
    
    const isExisting = persons.find(person => person.name === newContact.name || person.number === newContact.number)
    if(isExisting && isExisting.number == newContact.number) return alert(`Number ${newContact.number} is already added to phonebook as ${isExisting.name}`)
    else if(isExisting && isExisting.name == newContact.name) return alert(`${newContact.name} is already added to phonebook with number ${isExisting.number}`)

    setPersons(persons.concat(newContact))
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput onFilterHandler={onFilterHandler} />
      <h2>Add a new</h2>
      <ContactForm onSubmitHandler={onSubmitHandler} onNameHandler={onNameHandler} onNumberHandler={onNumberHandler}/> 
      <h2>Numbers</h2>
      <ContactList persons={persons} filter={filter} />
    </div>
  )
}

export default App