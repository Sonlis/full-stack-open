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

const Course = ({courses}) =>
    <>
        {courses.map(course => {
                return (
                    <>
                        <Header key={course.id} course={course}></Header>
                        <Content key={course.id }course={course}></Content>
                    </>
                )
            }

        )}
    </>

export default Course
