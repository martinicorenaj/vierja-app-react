import React, { useState,useEffect } from 'react'
import personService from './service/persons'


const FormForNewPeople=({addNameYNumber,newName,handleNameChange,newNumber,handleNumberChange})=> 

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


const Persons=({showFilter,persons,nameToShow,setPersons, handleClick})=> {
if (showFilter!==('')) {
return ( 
  <div>
  <h2>Filter to show</h2>
      <ul>
       {nameToShow.map(person=>
       <li key={person.id}>
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
       <button onClick={()=>{if (window.confirm(`delete ${person.name}?`))
        personService.erase(person.id)
        setPersons(persons.filter(p=>p.id!==person.id))
      }}>
       delete
       </button>
       </li>
      )}
      </ul>
  </div>)

}
 const Filter=({showFilter, handleSearchChange})=>
  <div>
      filter shown with:
      <input value={showFilter}
             onChange={handleSearchChange}
        />
  </div>
 

const App = () => {
  const [ persons, setPersons ] = useState([])

  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter,setShowFilter]= useState('')
  

  
  
  useEffect (()=>{
   personService.getAll()
                .then(response=>
                 setPersons(response.data)
                )
  },[])

  const addNameYNumber=(event)=>{
  
  
   event.preventDefault()
   const personObject={
    name:newName,
    number:newNumber,
   }
  
  const isPersonInPhonebook=persons.find(p=>p.name===newName)
  
if (!isPersonInPhonebook) {
  return (
  personService
     .create(personObject)
     .then(response=> {
       console.log("agrego nuevo")
       setPersons(persons.concat(response.data))
       setNewName('')
       setNewNumber('')
     })
)}
else {

    if (window.confirm(`${isPersonInPhonebook.name} is already added to the phonebook, replace the old number with a new one?`)) {
 return (
  personService
     .update(isPersonInPhonebook.id, personObject)
     .then(response=> {
       console.log("cambio numero")
      
       const personWithOutModified=persons.filter(p=>p.name!==newName)
    debugger
       setPersons(personWithOutModified.concat(personObject))
      
       setNewName('')
       setNewNumber('')
     })
   )
   }    
  }
 

   
   
}

  const handleNameChange=(event)=>{
  setNewName(event.target.value)
  }

  const handleNumberChange=(event)=>{
  setNewNumber(event.target.value)
  }
  
  const handleSearchChange=(event)=>{
    setShowFilter(event.target.value)

  }

  const nameToShow=persons.filter(person=>person.name.toLowerCase().includes(showFilter.toLowerCase()))
  
  return (
    
    <div>
      <h2>Phonebook</h2>
      <Filter showFilter={showFilter} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <FormForNewPeople addNameYNumber={addNameYNumber} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Persons showFilter={showFilter} persons={persons} nameToShow={nameToShow} setPersons={setPersons} />
    </div>
  )
}

export default App;
