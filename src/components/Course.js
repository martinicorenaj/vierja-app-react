import React from 'react'

const Course=({course})=> {
return (
<div>
      <h3>{course.name}</h3>
      <div>
      {course.parts.map(part =>
        <p key={part.id}> {part.name} {part.exercises}</p>
        )}
        </div>
      <h4>total of {course.parts.reduce((s,p)=>
        s+p.exercises,0)} exercises</h4>
        </div>
      
)
}

export default Course