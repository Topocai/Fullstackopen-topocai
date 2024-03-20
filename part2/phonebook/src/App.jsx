import { useState, useEffect } from 'react'
import FilterInput from './modules/filterInput';
import ContactList from './modules/contactList';
import ContactForm from './modules/contactForm';

import contactServices from './services/contacts.js'

const App = () => {

  const [persons, setPersons] = useState([])

  const contactFetch = () => 
  {
    contactServices.getAll()
    .then(contacts => setPersons(contacts))
  }

  useEffect(contactFetch, []);

  const [newContact, setNewContact] = useState({name: '', number: null, id: undefined})
  const [filter, setFilter] = useState('');
  
  const onNameHandler = (event) => 
  {
    let value = event.target.value;
    value = value.trim();
    setNewContact({...newContact, name: value})

    console.log("Name changer", newContact)
  }

  const onNumberHandler = (event) => 
  {
    const value = event.target.value;
    setNewContact({...newContact, number: value})

    console.log("Number changer", newContact)
  }

  const onFilterHandler = (event) => 
  {
    const value = event.target.value;
    setFilter(value)
    console.log("Filter Changer", filter)
  }

  const removeContactHandler = (id) => {
    if(window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) 
    {
      contactServices.removeContact(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
    } else {}
  }

  const onSubmitHandler = (event) => 
  {
    event.preventDefault()

    if(!isNaN(newContact.name)) return alert('Name cant be only numbers')
    
    const isExisting = persons.find(person => person.name === newContact.name || person.number === newContact.number);

    if(isExisting && isExisting.number == newContact.number) 
    {
      const confirm = window.confirm(`${isExisting.number} is already added to phonebook, replace the old name with a new one?`);
      if(confirm) 
      {
        contactServices.updateContact(isExisting.id, {...isExisting, name: newContact.name})
        .then(updatedContact => setPersons(persons.map(person => person.id !== updatedContact.id ? person : updatedContact)))
      }
    }
    else if(isExisting && isExisting.name == newContact.name) 
    {
      const confirm = window.confirm(`${isExisting.name} is already added to phonebook, replace the old number with a new one?`);
      if(confirm)
      {
        contactServices.updateContact(isExisting.id, {...isExisting, number: newContact.number})
        .then(updatedContact => setPersons(persons.map(person => person.id !== updatedContact.id ? person : updatedContact)))
      } else {}
    } 
    else if (!isExisting) 
    {
      contactServices.addContact(newContact)
      .then(contact => setPersons(persons.concat(contact)))
    }

    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput onFilterHandler={onFilterHandler} />
      <h2>Add a new</h2>
      <ContactForm onSubmitHandler={onSubmitHandler} onNameHandler={onNameHandler} onNumberHandler={onNumberHandler}/> 
      <h2>Numbers</h2>
      <ContactList persons={persons} filter={filter} removeContactHandler={removeContactHandler}/>
    </div>
  )
}

export default App