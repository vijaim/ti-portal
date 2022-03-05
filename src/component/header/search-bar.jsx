import React from 'react'

const SearchBar = ({ searchValue, onSearchValueChange }) => {
  return (
    <input type="text" className="form-control" value = {searchValue} onChange={(e) => onSearchValueChange(e)} id="inputVerificationCode" placeholder="Search for a insight (e.g. page views, users) " required />
  )
}

export default SearchBar
