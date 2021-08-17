import React from 'react'

const SearchBar = ({ searchValue, onSearchValueChange }) => {
  return (
    <input type="text" className="form-control" value = {searchValue} onChange={(e) => onSearchValueChange(e)} id="inputVerificationCode" placeholder="Search for a metric (e.g. sales, profit) " required />
  )
}

export default SearchBar
