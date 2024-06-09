import { useState } from 'react'

import { Routes, Route, useMatch } from 'react-router-dom'

import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Menu from './components/Menu'
import About from './components/About'
import Note from './components/Note'
import Notification from './components/Notification'

import { NotificationProvider } from './hooks/notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const anecdoteUrl = useMatch('/anecdotes/:id')
  const note = anecdoteUrl ? anecdotes.find(note => note.id === Number(anecdoteUrl.params.id)) : null

  return (
    <>
      <main>
        <h1>Software anecdotes</h1>
        <Menu />
        <hr />
        <NotificationProvider>
        <section>
          <Notification />
          <Routes>
            <Route path='/create' element={ <CreateNew updateList={setAnecdotes} /> } />
            <Route path='/' element={ <AnecdoteList anecdotes={anecdotes} /> } />
            <Route path='/about' element={ <About /> } />
            <Route path='/anecdotes/:id' element={ <Note note={note} /> } />
          </Routes>
        </section>
        </NotificationProvider>
        <hr />
      </main>
      <Footer />
    </>
    
  )
}

export default App
