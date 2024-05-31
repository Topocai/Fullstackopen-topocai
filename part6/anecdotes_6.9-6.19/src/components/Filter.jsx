import React from 'react'
import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    const onChangeHandler = (event) => dispatch(setFilter(event.target.value))
    
    return (
        <article style={{ marginBottom: 10 }}>
          <label>
            Filter by content:
            <input onChange={onChangeHandler} />
          </label>
        </article>
    )
}

export default Filter