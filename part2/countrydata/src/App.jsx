import { useEffect, useState } from 'react'

import axios from 'axios'

import Countries from './modules/countries'

const App = () => {
  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState(null)

  const apiUrlBase = `https://studies.cs.helsinki.fi/restcountries/api`;

  //So much gets but.. without a "search" button, how do we know when to fetch the data?
  useEffect(() => 
  {
    if(countrySearch === '') return;

    const promise = axios.get(`${apiUrlBase}/all`);

    console.log("Fetching countrys..")

    promise.then(response => 
    {
      setCountries(response.data)
    });
  }, [countrySearch])

  const handleCountrySearchChange = (event) => setCountrySearch(event.target.value)

  return (
    <>
      <div>
        <label>Find countries
          <input type="text" onChange={handleCountrySearchChange}/>
        </label>
      </div>
      <Countries countrys={countries} filter={countrySearch}/>
    </>
  )
}

export default App
