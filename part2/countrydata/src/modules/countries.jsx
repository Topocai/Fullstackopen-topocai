import { useState } from "react";

const DisplayCountry = ({country, buttonHandler}) => 
{
  return (
    <div>
      {
      buttonHandler ? 
      <label>
        {country.name.common}
        <button onClick={buttonHandler}>Hide</button>
      </label> : null
      }
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <p>Continent/s: {country.continents.map(c => c)}</p>
      <h2>languages</h2>
      <ul>
        {Object.keys(country.languages).map(language => <li key={language}>{country.languages[language]}</li>)}
      </ul>
      <img src={country.flags.svg} alt={country.name.common + " flag"} width="250"/>
    </div>
  )
}

const Country = ({country}) => 
{
  const [showData, setShowData] = useState(false);

  if(showData) 
  {
    return DisplayCountry({country, buttonHandler: () => setShowData(false)})
  }
  else 
  {
    return (
      <div>
        <label>
          {country.name.common}
          <button onClick={() => setShowData(true)}>Show</button>
        </label>
        
      </div>
    )
  } 
}

const Countries = ({countrys, filter}) => 
{
  if(countrys === null) return;

  let filteredCountrys = countrys.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  filteredCountrys = filteredCountrys.length == 0 ? countrys.filter(country.name.official.toLowerCase().includes(filter.toLowerCase())): filteredCountrys;

  if(filteredCountrys.length > 10) 
  {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if(filteredCountrys.length > 1)
  {
    return (
      <div>
        {filteredCountrys.map(country => <Country key={country.name.common} country={country}/>)}
      </div>
    )
  }
  else if(filteredCountrys.length === 1) 
  {
    return <DisplayCountry country={filteredCountrys[0]}/>
  }
}

export default Countries