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

const Search = () => {
  const [toSearch, setToSearch] = useState('');
  const [data, setData] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetchApiData().then((tempData) => {
      setData(tempData);
    });
  }, []);

  useEffect(() => {
    checkForMatches();
    console.log(data);
  }, [toSearch]);

  const displayResult = (results) => {
    return results.map((result) => (
      // <div className="searchResult" key={result.id}>
      //   <h1>{result.fullName}</h1>
      //   <p>id: {result.id}</p>
      //   <p>title: {result.title}</p>
      //   <p>family: {result.family}</p>
      //   <p>image: {result.imageUrl}</p>
      //   <p>house: {result.house}</p>
      // </div>
      <div>
        <img src={result.imageUrl} alt="" className="" />
        <p className="text-center">{result.fullName}</p>
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
