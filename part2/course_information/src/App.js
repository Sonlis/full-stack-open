const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ course }) => {
    const initialValue = 0;
    const total = course.parts.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.exercises;
        },
        initialValue
    );
    return (
        <p>total of {total}</p>
    )
}

const Part = ({ part }) =>
    <p>
      {part.name} {part.exercises}
    </p>

const Content = ({ course }) => {
    return (
        <>
            {course.parts.map(part =>
                <Part key={part.id} part={part}/>
            )}
            <Total course={course}></Total>
        </>
    )
}

const Course = ({course}) =>
    <>
      <Header course={course}></Header>
      <Content course={course}></Content>
    </>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
