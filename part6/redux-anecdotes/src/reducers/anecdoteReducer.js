const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'notes/vote':
      return state.map(n => n.id === action.payload.id ? {...n, votes: n.votes + 1} : n)
    case 'notes/add':
      return [...state, action.payload]
    default: return state
  }
}

export const createNoteAction = (type, payload) => ({type: `notes/${type}`, payload})

export const voteAnecdote = (id) => createNoteAction('vote', {id})

export const addNote = (content) => createNoteAction('add', asObject(content))

export default reducer