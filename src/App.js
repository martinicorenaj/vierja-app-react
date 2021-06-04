import React, { useState } from 'react'

const Persons=({showFilter,persons,nameToShow})=> {
if (showFilter!==('')) {
return (
  <div>
  <h2>Filter to show</h2>
      <ul>
       {nameToShow.map(person=>
       <li key={person.name}>
       {person.name} {person.number}
       </li>
      )}
      </ul>
  </div>
 )}
  return (
    <div>
  <h2>Numbers</h2>
      <ul>
       {persons.map(person=>
       <li key={person.name}>
       {person.name} {person.number}
       </li>
      )}
      </ul>
  </div>)

}


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter,setShowFilter]= useState('')

  const addNameYNumber=(event)=>{
   event.preventDefault()
   const personObject={
    name:newName,
    number:newNumber,
   }
   persons.map(person=> {
    if (person.name===newName) {

    alert(`${newName} is already added to the phonebook`)
   }
  }
  )
   
   setPersons(persons.concat(personObject))
   setNewName('')
   setNewNumber('')
}

  const handleNameChange=(event)=>{
  console.log(event.target.value)
  setNewName(event.target.value)
  }

  const handleNumberChange=(event)=>{
  setNewNumber(event.target.value)
  }
  
  const handleSearchChange=(event)=>{
    setShowFilter(event.target.value)

  }

  const nameToShow=persons.filter(person=>person.name.toLowerCase()===showFilter.toLowerCase())

  return (
    
    <div>
      <h2>Phonebook</h2>
      <div>
      filter shown with:
      <input value={showFilter}
             onChange={handleSearchChange}
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addNameYNumber}>
        <div>
          name: <input value={newName}
                       onChange={handleNameChange}
               />
        </div>
        <div>
         number: <input value={newNumber}
                       onChange={handleNumberChange}
               />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Persons showFilter={showFilter} persons={persons} nameToShow={nameToShow} />
    </div>
  )
}

export default App;
