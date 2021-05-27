import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
  {props.text}
  </button> 
)
const Statistic = (props) => 

<table>
 <tbody>
 <tr>
 <td>{props.name}</td><td>{props.value}</td>
 </tr>
 </tbody>
</table>


const Statistics = (props) => {
if (props.all===0) {
  return (
  <div>
    <p>No feedback given</p>
</div>
  )
}

return (
<div>
      <Statistic name="good" value={props.good} />
      <Statistic name="neutral"  value={props.neutral} />
      <Statistic name="bad"  value={props.bad} />
      <Statistic name="all"  value={props.all} /> 
      <Statistic name="average"  value={(props.good-props.bad)/props.all} /> 
      <Statistic name="positive" value={(props.good/props.all)*100+"%"} />
    </div>
    
    
)
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all=good+bad+neutral
  

  return (
    <div>
    <h1>give feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text="good" />
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={()=>setBad(bad+1)} text="bad" />
    <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </div>


  )
}

export default App