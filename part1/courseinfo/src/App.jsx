const Header = ({name}) => 
{
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ part, exercises}) => 
{
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({parts}) => 
{
  return (
    <div>
      {parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = ({parts}) => 
{
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
