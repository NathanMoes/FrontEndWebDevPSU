const SearchBar = (props) => {
  const handelOnChange = (event) => {
    props.onChange(event.target.value);
  };
  return (
    <div className="search-bar text-center">
      <label for="searchBarInput">Character to search </label>
      <br />
      <input
        id="searchBarInput"
        type="text"
        placeholder={props.placeHolder ? props.placeHolder : 'Search...'}
        onChange={(event) => {
          handelOnChange(event);
        }}
      />
    </div>
  );
};

export default SearchBar;
