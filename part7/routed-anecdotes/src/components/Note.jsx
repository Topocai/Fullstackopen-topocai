/* eslint-disable react/prop-types */
const Note = ({ note }) => {
  return (
    <article>
      <h3>{note.content}</h3>
      <p>Has <span style={{fontWeight: 'bold'}}>{note.votes}</span> votes</p>
      <p>By <span style={{fontWeight: 'bold'}}>{note.author}</span></p>
      <p>For more info see <a href="{note.info}">{note.info}</a></p>
    </article>
  )
}

export default Note