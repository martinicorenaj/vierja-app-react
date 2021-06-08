import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BasicInfo=({showFilter,countries, nameToShow})=> {
const arg=countries.filter(countrie=>countrie.name==="Argentina")
console.log('que tiene arg',arg)

if (nameToShow.length>10) {

 return (
 <p>to many matches especify another filter</p>
 )}

if (nameToShow.length<10) {
return (
  <div>
        <ul>
       {nameToShow.map(countrie=>
      
       <li key={countrie.name}>
       {countrie.name} 
       </li>
      )}
      </ul>
  </div>
 )}
 if (nameToShow.length>10) {

 return (
 <p>to many matches especify another filter</p>
 )}

if (nameToShow.length===1) {
  return (
  <div>hola javier</div>
  )
} 
  

}


const App=() => {

  const [countries, setCountries]= useState([])

  const [showFilter,setShowFilter]= useState('')

  useEffect (()=>{
    axios
         .get('https://restcountries.eu/rest/v2/all')
         .then(response=>{
          setCountries(response.data)
         })
  },[])

const handleSearchChange=(event)=>{
    setShowFilter(event.target.value)


    

  }
const nameToShow = countries.filter(countrie=>countrie.name.toLowerCase().includes(showFilter.toLowerCase()))

//usar includes

  return (
  <div>
      <div>
      find countries:
      <input value={showFilter}
             onChange={handleSearchChange}
        />
      </div>
  <BasicInfo showFilter={showFilter} countries={countries} nameToShow={nameToShow} />
     </div>
  )
}

export default App;
