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
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = ({parts}) => 
{
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <strong>Total of {total} exercises</strong>
  )
}

const Course = ({course}) => 
{
  return (
    <div>
      <Header name={course.name} /> 
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Courses = ({courses}) => {
    return (
        <div>
        {courses.map(course => <Course key={course.id} course={course} />)}
        </div>
    )
}

export default Courses