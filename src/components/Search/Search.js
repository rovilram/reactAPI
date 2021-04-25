import './Search.css';
import React, { useState } from 'react';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const searchTextHandler = (e) => {

    setSearchText(e.target.value)
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.searchBand(searchText);

  };

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        className="Search__searchText"
        placeholder="Busca tu banda"
        onChange={searchTextHandler}
      />
      <input type="submit" value="Buscar" />
    </form>
  );
}

export default Search;
