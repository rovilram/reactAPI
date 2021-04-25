import './Main.css';
import React, { useState, useEffect } from 'react';
import Search from '../Search/Search';
import useFetchArtists from '../../hooks/useFetch/useFetchArtists';
function Main(props) {
  const [searchText, setSearchText] = useState('');

  /*   const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [action, setAction] = useState('');
  const [edit, setEdit] = useState(''); */

  /*   useEffect(() => {
    let newTasks = getTasks();
    newTasks = newTasks ? newTasks : '[]';
    setTasks([...tasks, ...newTasks]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */
  /* 
  useEffect(() => {
    saveTasks(tasks);
  }); */

  const [artistsState, fetchArtists] = useFetchArtists();

  useEffect(
    function () {
      searchText && fetchArtists(searchText);
    },
    [fetchArtists, searchText],
  );

  const searchBand = (text) => {
    console.log('texto de búsqueda:', text);
    setSearchText(text);
  };

  const drawArtists = () => {
    const artists = artistsState.data.map((artist) => (
      <a
        href={`http://discogs.com${artist.uri}`}
        className="artistWrapper"
        target="_blank"
        rel="noreferrer"
        key={artist.id}
      >
        <div className="artistTitle">{artist.title}</div>
        <img src={artist.cover_image} alt="" />
      </a>
    ));
    artistsState.data.map((artist) => console.log(artist));
    return artists;
  };

  return (
    <main>
      <Search searchBand={searchBand} />
      {artistsState.isLoading && <div>Cargando artista</div>}
      {artistsState.isFailed && <div>Fallo recuperando artista</div>}
      {searchText && artistsState.isSuccess && drawArtists()}
    </main>
  );
}

export default Main;
