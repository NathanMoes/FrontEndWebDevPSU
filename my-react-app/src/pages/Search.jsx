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

function isOutlierName(name) {
  const toComp = name.toLowerCase();
  if (toComp.includes('sandor')) {
    return true;
  } else if (toComp.includes('brienne')) {
    return true;
  } else if (toComp.includes('daario')) {
    return true;
  } else if (toComp.includes('melisandre')) {
    return true;
  } else if (toComp.includes('wylis')) {
    return true;
  } else if (toComp.includes('qyburn')) {
    return true;
  }
  return false;
}

function getFullNameCorrected(name) {
  const toComp = name.toLowerCase();
  if (toComp.includes('sandor')) {
    return 'The Hound';
  } else if (toComp.includes('brienne')) {
    return 'Brienne of Tarth';
  } else if (toComp.includes('daario')) {
    return 'Daario';
  } else if (toComp.includes('melisandre')) {
    return 'Melisandre';
  } else if (toComp.includes('wylis')) {
    return 'Hodor';
  } else if (toComp.includes('qyburn')) {
    return 'Qyburn';
  }
}

function capitalizeHouseNames(name) {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const Search = () => {
  const [toSearch, setToSearch] = useState('');
  const [data, setData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetchApiData()
      .then((tempData) => {
        setData(
          tempData.map((character) => {
            return {
              ...character,
              lastName: capitalizeHouseNames(
                standardizeHouseName(character.lastName)
              ),
              firstName: capitalizeHouseNames(
                standardizeHouseName(character.firstName)
              ),
              fullName: isOutlierName(character.firstName)
                ? getFullNameCorrected(character.firstName)
                : capitalizeHouseNames(
                    character.firstName +
                      ' ' +
                      standardizeHouseName(character.lastName)
                  ),
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
        setData(null);
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
        <p className="text-center">{result.fullName}</p>
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
      <div className="d-flex flex-column mx-auto">
        {displayResult(searchResult)}
      </div>
    </div>
  );
};

export default Search;
