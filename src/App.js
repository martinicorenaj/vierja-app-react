import React, { useState } from 'react'

const Button=(props)=>
<button onClick={props.handleClick}>
{props.text}
</button>




const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  console.log(selected)
  
  const [point, setPoint] = useState({})
  
  const random =()=>{
    setSelected(Math.ceil(Math.random()*anecdotes.length-1))
    
   }
                   
  
  


  const handleVote=()=> {
  console.log(point[selected])
  let votes=0
  if (point[selected]) {
    votes=point[selected]
   
   } 
  votes+=1
  
  setPoint({...point,[selected]:votes})
  console.log("printeando point",point)
  

  }

const mostVoted=()=> {
  var masVotos=0
  for (var anec in point) {
  if (point[anec]>=masVotos) {
    masVotos=point[anec]
    
}
return [anec]
}

 
}

  return (
    <div>
     <h2>Anecdote of the day</h2>
     <p> {anecdotes[selected]}</p>
     <p> has {point[selected]} votes </p>
     <Button handleClick={random} text="next anecdote" />
      <Button handleClick={handleVote} text="vote" />
    <h2>Anecdote with most votes</h2>
     <p> {anecdotes[mostVoted]}</p>
    
    </div>

  )
}

export default App