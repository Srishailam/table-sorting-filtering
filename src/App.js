import './App.css';
import { useEffect, useState } from 'react';
import SearchInput from './components/SearchInput/SearchInput';
import CountriesTable from './components/CountriesTable/CountriesTable';
import { Brightness6Rounded } from '@material-ui/icons';

function App() {
  const [countries, setCountries] = useState([]);
  const [userInput, setUserInput] = useState('');

  const [filteredCountires, setFilteredCountires] = useState([]);

  const [theme, setTheme] = useState('light')

  const [query, setQuery] = useState('')


  const switchTheme = () => {
    if(theme==="light"){
      saveTheme('dark')
    } else {
      saveTheme('light')
    }
  }

  async function getCountries(){
    const res = await fetch(`https://restcountries.eu/rest/v2/all`);
    const countries = await res.json();
    setCountries(countries);
  }
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    setFilteredCountires( countries.filter( eachCountry => eachCountry.name.toLowerCase().indexOf(userInput) > -1 || eachCountry.region.toLowerCase().indexOf(userInput) > -1 || eachCountry.subregion.toLowerCase().indexOf(userInput) > -1) )
  }, [userInput, countries]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'))
    setTheme(localStorage.getItem('theme'))
  }, [])

  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute("data-theme", theme);
  }
  const debounce = (fn, delay) => {
    let timer;
    let context = this;
    return function(){
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(function(){ fn.call(context) }, delay);
    }
  }
  // const handleUserInput = debounce((text) => {
  //   console.log(text,'value')
  //   setQuery(text);
  // }, 500)

  function handleUserInput(value){
    let text = value;
    return debounce((text) => {
      setQuery(text);
    }, 500);
  }
  return (
    <div className="App">
      <input type="text" value={query} onChange={e => handleUserInput(e.target.value)}/>
      <pre>
        {
          JSON.stringify(query, null, 2)
        }
      </pre>
      <header className="header">
        <h1>World Countries</h1><button className="themeSwitcher" onClick={switchTheme}><Brightness6Rounded /></button>
      </header>
      <main className="main">
      <div className="">Found {filteredCountires.length} countries</div>
      <SearchInput placeholder="Filter by Name, Region or SubRegion" value={userInput} onChange={(e) => {e.preventDefault(); setUserInput(e.target.value.toLocaleLowerCase())}}/>
      <CountriesTable countries={filteredCountires}/>
      </main>
      <footer className="footer">Srishailam @2020</footer>
    </div>
  );
}

export default App;
