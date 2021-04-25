import './Main.css';
import React, { useState, useEffect } from 'react';
import Search from '../Search/Search';
import BandInfo from '../BandInfo/BandInfo';
import useFetchArtists from '../../hooks/useFetch/useFetchArtists';

function Main(props) {
  const [searchText, setSearchText] = useState('');
  const [detailID, setdetailID] = useState('');
  //const [artistDetail, setArtistDetail] = useState('');

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
    setdetailID('');
  };

  const detailView = (id) => {
    setdetailID(id);
  };

  const drawArtists = () => {
    const artists = artistsState.data.map((artist) => (
      <article
        onClick={() => detailView(artist.id)}
        className="artistWrapper"
        target="_blank"
        rel="noreferrer"
        key={artist.id}
      >
        <div className="artistTitle">{artist.title}</div>
        <img src={artist.thumb} alt="" />
      </article>
    ));
    artistsState.data.map((artist) => console.log(artist));
    return artists;
  };

  return (
    <main>
      <Search searchBand={searchBand} />
      {artistsState.isLoading && <div>Cargando artista</div>}
      {artistsState.isFailed && <div>Fallo recuperando artista</div>}
      {!detailID && searchText && artistsState.isSuccess && drawArtists()}
      {detailID && (
        <div>
          <BandInfo id={detailID} />
        </div>
      )}
    </main>
  );
}

export default Main;
