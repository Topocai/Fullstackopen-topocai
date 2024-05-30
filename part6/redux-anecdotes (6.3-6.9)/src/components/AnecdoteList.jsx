import { useSelector } from "react-redux"

import Filter from "./Filter"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const notes = useSelector(state => 
        state.notes
        .sort((a, b) => b.votes - a.votes)
        .filter(note => note.content.toLowerCase().includes(filter))
    )
    return (
      <section>
        <Filter />
        {notes.map(note => <Anecdote key={note.id} note={note} />)}
      </section>
    )
}

export default AnecdoteList