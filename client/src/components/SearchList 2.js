import React from 'react'
import SearchItem from './SearchItem'

const SearchList = (props) => {
    return(
        
        <label htmlFor="search">Search by name</label>
        <input type="text" value={props.inputValue} onChange={props.searchFilterOnChange}/>
    )
}