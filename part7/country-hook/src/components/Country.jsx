const Country = ({ country }) => {
  if (!country) {
    return null
  }
  
  if (country.error) {
    return (
      <div>
        not found...
      </div>
    )
  }
  
  return (
    <article>
      <h3>{country.name.official} </h3>
      <div>* Capital: {country.capital.join(" ")} </div>
      <div>* Population: {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>  
    </article>
  )
}

export default Country