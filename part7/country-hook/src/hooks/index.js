import { useState, useEffect } from 'react'

import { getByName } from '../services/country'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    async function getCountry() {
      const country = await getByName(name)
      setCountry(country)
    }
    if (name == '') return
    getCountry()
  }, [name])
  
  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')
  
  const onChange = event => setValue(event.target.value)
  
  return { type, value, onChange }
}
  