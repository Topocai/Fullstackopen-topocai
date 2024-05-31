import React from 'react'
import { useSelector } from "react-redux"

import Filter from "./Filter"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const notes = useSelector(state => state.notes)

    const displayNotes = notes
    .filter(note => note.content.toLowerCase().includes(filter))
    .sort((a, b) => b.votes - a.votes)

    return (
      <section>
        <Filter />
        {displayNotes.map(note => <Anecdote key={note.id} note={note} />)}
      </section>
    )
}

export default AnecdoteList