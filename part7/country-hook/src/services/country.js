import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getByName = async name => {
  try {
    const country = await axios.get(`${BASE_URL}/name/${name}`)
    console.log(country)
    return country.data
  } catch {
    return { error: 'Not Found..'}
  } 
}

export { getByName }
