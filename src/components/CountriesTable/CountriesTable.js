import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';
import React, { useState } from 'react'
import "./CountriesTable.css";

const orderBy = (countries, value, direction) => {
  if(direction==="asc"){
    return countries.sort( (a, b) => a[value] > b[value] ? 1: -1);
  }
  if (direction==="desc"){
    return countries.sort( (a, b) => a[value] > b[value] ? -1: 1);
  }
  return countries;
}
const SortArrow = ({direction}) => {
  if(!direction){
    return null;
  }
  if(direction ==="desc"){
    return (
      <div className="heading_arrow">
        <KeyboardArrowDownRounded color="inherit"/>
      </div>
    )
  } else {
    return (
      <div className="heading_arrow">
      <KeyboardArrowUpRounded color="inherit"/>
    </div>
    )
  }
}
function CountriesTable({countries}) {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if(!direction){
      setDirection('desc');
    } else if(direction === "desc"){
      setDirection("asc")
    } else {
      setDirection(null);
    }
  }
  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  }
  return (
    <div className="CountriesTable">
      <div className="heading">
        <button className="heading_name" onClick={() => setValueAndDirection("name")}>
          <div>Name</div>
          { value === "name" && <SortArrow direction={direction}/> }
        </button>
        <button className="heading_population" onClick={() => setValueAndDirection("population")}>
          <div>Population</div>
          { value === "population" && <SortArrow direction={direction}/> }
        </button>
      </div>
      {
        (orderCountries || []).map( country => (
        <div className="row" key={country.name}>
          <div className="name">{country.name}</div>
          <div className="population">{country.population}</div>
        </div>
        ))
      }
    </div>
  )
}

export default CountriesTable
