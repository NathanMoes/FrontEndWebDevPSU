import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Button } from 'react-bootstrap';

const Search = () => {
  const [toSearch, setToSearch] = useState('');
  const handelOnChange = (value) => {
    console.log(value);
  };
  return (
    <div className="d-flex flex-column">
      <div className="text-center">
        <h1>Search</h1>
        <p>Search for a house in the thrones api</p>
      </div>
      <SearchBar placeHolder={'First or Last name'} onChange={handelOnChange} />
    </div>
  );
};

export default Search;
