import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Pais=({countrie})=>{
 return (
  <div>
   <h3>{countrie.name}</h3>
   <p>capital {countrie.capital}</p>
   <p>population {countrie.population}</p>
   <img src={countrie.flag} alt='bandera' width="70" height="50"/>
   <h3>Language</h3>
   <ul>
      {countrie.languages.map(language=>
    <li key={countrie.name}>
        {language.name}
    </li>
    )}
   </ul>
</div>
  )
}

const BasicInfo=({showFilter, countries, nameToShow, pais, handleClick})=> {
 

  
if (nameToShow.length>10) {

 return (
 <p>to many matches especify another filter</p>
 )}

if (nameToShow.length<10&&nameToShow.length>1) {
return (
  <div>
    <ul>
      {nameToShow.map(countrie=>
       <li key={countrie.name}>
        {countrie.name} 
        <button onClick={()=>handleClick(countrie)}>
        show
        </button>
       </li>
      )}
    </ul>

   </div>
 )}
console.log('pais', pais)

if (nameToShow.length<=1) {
  return (
  <div>
    {nameToShow.map(countrie=>
     <Pais key={countrie.name} countrie={countrie} />
    )}
  </div>
 )} 

 
}


const App=() => {


  const [countries, setCountries]= useState([])

  const [showFilter,setShowFilter]= useState('')
  
  const [pais, setNewpais]=useState(null)

  const handleClick=(countrie)=>{
  setNewpais(countrie)
  console.log('pais',countrie)

 }

  useEffect (()=>{
    axios
         .get('https://restcountries.eu/rest/v2/all')
         .then(response=>{
          setCountries(response.data)
         })
  },[])

const handleSearchChange = (event)=>{
    setShowFilter(event.target.value)
 }

 const nameToShow = countries.filter(countrie=>
    countrie.name.toLowerCase().includes(showFilter.toLowerCase())
    )
 console.log('condicion',!(nameToShow.length===1))

  return (
  <div>
      <div>
      find countries:
      <input value={showFilter}
             onChange={handleSearchChange}
        />
      </div>
   <BasicInfo showFilter={showFilter} countries={countries} nameToShow={nameToShow} pais={pais} handleClick={handleClick}/>
   <div>{(pais&&!(nameToShow.length===1)) &&
  <div>
     <Pais key={pais.name} countrie={pais} />
  </div>
 } </div>

     </div>
  )
}

export default App;
