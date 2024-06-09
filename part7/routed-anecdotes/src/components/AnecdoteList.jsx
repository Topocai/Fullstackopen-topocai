/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const AnecdoteList = ({ anecdotes }) => (
    <article>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} > <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link> </li>)}
      </ul>
    </article>
  )

export default AnecdoteList
