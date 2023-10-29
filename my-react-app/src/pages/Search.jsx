import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Button } from 'react-bootstrap';
import styles from '../styles.css';

const url = 'https://thronesapi.com/api/v2/Characters';

const fetchApiData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function standardizeHouseName(name) {
  if (!name) return name;

  name = name.trim().toLowerCase();

  if (name.includes('stark')) {
    return 'Stark';
  } else if (name.includes('lannister') || name.includes('lanister')) {
    return 'Lannister';
  } else if (
    name.includes('targaryen') ||
    name.includes('targaryn') ||
    name.includes('targaryan')
  ) {
    return 'Targaryen';
  } else if (name.includes('baratheon')) {
    return 'Baratheon';
  } else if (name.includes('greyjoy')) {
    return 'Greyjoy';
  } else if (name.includes('martell')) {
    return 'Martell';
  } else if (name.includes('arryn')) {
    return 'Arryn';
  } else if (name.includes('frey')) {
    return 'Frey';
  } else if (name.includes('tyrell')) {
    return 'Tyrell';
  } else if (name.includes('tully')) {
    return 'Tully';
  } else if (
    name.includes('none') ||
    name.includes('unknown') ||
    name.includes('unkown')
  ) {
    return '';
  } else {
    // For all other names, capitalize the name given. As it is their last name most of the time
    // aka they are their own house. And other houses that are correct just caps em
    return name;
  }
}

const Search = () => {
  const [toSearch, setToSearch] = useState('');
  const [data, setData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetchApiData().then((tempData) => {
      setData(
        tempData.map((character) => {
          return {
            ...character,
            lastName: standardizeHouseName(character.lastName),
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    checkForMatches();
    console.log(data);
  }, [toSearch]);

  const displayResult = (results) => {
    return results.map((result) => (
      <div>
        <img src={result.imageUrl} alt="" className="" />
        <p className="text-center">
          {result.firstName} {result.lastName}
        </p>
        <p className="text-center">{result.title}</p>
      </div>
    ));
  };

  const checkForMatches = () => {
    if (data) {
      const matches = data.filter(
        (character) =>
          toSearch.length >= 1 &&
          (character.firstName.toLowerCase().includes(toSearch.toLowerCase()) ||
            character.lastName.toLowerCase().includes(toSearch.toLowerCase()))
      );
      setSearchResult(matches);
    }
  };

  const handleOnChange = (value) => {
    setToSearch(value); // Set the state first
  };

  return (
    <div className="d-flex flex-column">
      <div className="text-center">
        <h1>Search</h1>
        <p>Search for a house in the thrones api</p>
      </div>
      <SearchBar placeHolder={'First or Last name'} onChange={handleOnChange} />
      {displayResult(searchResult)}
    </div>
  );
};

export default Search;
