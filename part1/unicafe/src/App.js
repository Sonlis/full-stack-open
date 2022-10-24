import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
    return (
        <>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </>
    )
}

const Statistics = (props) => {
    const all = props.bad + props.neutral + props.good;
    if (all !== 0) {
        return (
            <>
                <h2>statistics</h2>
                <table>
                    <tbody>
                        <StatisticsLine text="good" value={props.good}/>
                        <StatisticsLine text="neutral" value={props.neutral}/>
                        <StatisticsLine text="bad" value={props.bad}/>
                        <StatisticsLine text="total" value={all}/>
                        <StatisticsLine text="average" value={ (props.good - props.bad) / all }/>
                        <StatisticsLine text="positive" value={ props.good / all * 100 + "%" } />
                    </tbody>
                </table>
            </>
        )
    }
}

const App = () => {
  // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const increaseGood = () => setGood(good + 1)
    const increaseNeutral = () => setNeutral(neutral + 1)
    const increaseBad = () => setBad(bad + 1)


    return (
        <div>
            <h2>give feedback</h2>
            <button onClick={increaseGood}>good</button>
            <button onClick={increaseNeutral}>neutral</button>
            <button onClick={increaseBad}>bad</button>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App
