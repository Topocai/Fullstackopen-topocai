import { useState } from 'react'


const RandomAnecdoteButton = ({ onClick }) =>  <button onClick={onClick}>Random Anecdote</button>

const VoteAnecdote = ({ onClick }) => <button onClick={onClick}>Vote</button>

const DisplayAnecdote = ({ anecdote, votes }) => 
{
  if(anecdote === null) return;
  return (
    <>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
    </> 
  )
}
const App = () => {
  const initialAnecdotes = {
    'If it hurts, do it more often.': 0,
    'Adding manpower to a late software project makes it later!': 0,
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.': 0,
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.': 0,
    'Premature optimization is the root of all evil.': 0,
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.': 0,
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.': 0,
    'The only way to go fast, is to go well.': 0
  }

  const [anecdote, setAnecdote] = useState(null);
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)
  const [mostVoted, setMostVoted] = useState(null);

  const randomAnecdote = () => {
    const keys = Object.keys(anecdotes);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomAnecdote = keys[randomIndex];
    setAnecdote(randomAnecdote);
  }

  const voteUp = () => {
    const newAnecdotes = { ...anecdotes, [anecdote]: anecdotes[anecdote] + 1};
    const mostVotedAnecdote = Object.keys(newAnecdotes).reduce((a, b) => newAnecdotes[a] > newAnecdotes[b] ? a : b);
    setMostVoted(mostVotedAnecdote);
    setAnecdotes(newAnecdotes);
  }


  return (
      <div>
        <h1>Anecdote of the day</h1>
        <DisplayAnecdote anecdote={anecdote} votes={anecdotes[anecdote]} />
        <RandomAnecdoteButton onClick={randomAnecdote} />
        <VoteAnecdote onClick={voteUp} />
        <h1>Anecdote with most votes</h1>
        <DisplayAnecdote anecdote={mostVoted} votes={anecdotes[mostVoted]} />
      </div>
  )
}

export default App
