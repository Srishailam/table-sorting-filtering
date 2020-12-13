import React from 'react'
import SearchRounded from "@material-ui/icons/SearchRounded";
import "./SearchInput.css";
function SearchInput({...rest}) {
  return (
    <div className="SearchInput">
      <SearchRounded color="inherit"/>
      <input type="text" {...rest}/>
    </div>
  )
}

export default SearchInput
