import { useState } from 'react'



const ButtonFeedback = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const StaticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )

}

const Stadistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) 
  {
    return (
      <div>
        <h1>stadistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good / total * 100;

  return (
    <div>
      <h1>stadistics</h1>
      <table>
        <tbody>
          <StaticsLine text="good" value={good} />
          <StaticsLine text="neutral" value={neutral} />
          <StaticsLine text="bad" value={bad} />
          <StaticsLine text="all" value={total} />
          <StaticsLine text="average" value={average} />
          <StaticsLine text="positive" value={`${positive} %`} />
        </tbody> 
      </table>
      
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  console.log(good, neutral, bad)

  return (
      <div>
        <h1>give feedback</h1>
        <ButtonFeedback text="good" onClick={() => setGood(good + 1)} />
        <ButtonFeedback text="neutral" onClick={() => setNeutral(neutral + 1)} />
        <ButtonFeedback text="bad" onClick={() => setBad(bad + 1)} />
        <Stadistics good={good} neutral={neutral} bad={bad} />
      </div>
  )
}

export default App
