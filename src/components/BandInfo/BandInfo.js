import './BandInfo.css';
import React, { useEffect, Fragment } from 'react';
import useFetchArtist from '../../hooks/useFetch/useFetchArtist';
import useFetchDisco from '../../hooks/useFetch/useFetchDisco';

function BandInfo(props) {
  const [artistState, fetchArtist] = useFetchArtist('');
  const [discoState, fetchDisco] = useFetchDisco('');

  console.log(artistState);

  useEffect(() => {
    fetchArtist(props.id);
    fetchDisco(props.id);
  }, [fetchArtist, fetchDisco, props.id]);

  const bandMenbers = () => {
    return artistState.data.members.map((member) => (
      <div key={member.id} className="memberWrapper">
        <p className="memberName">{member.name}</p>
        <img src={member.thumbnail_url} alt={member.name} />
      </div>
    ));
  };

  const bandDisco = () => {
    console.log('DISCO', discoState.data);
    return (
      discoState.data
        //.filter((disco) => disco.role === 'Main')
        .map((disco) => (
          <div key={disco.id} className="discoWrapper">
            <p className="discoText">
              {disco.artist} - {disco.title} ({disco.year})
            </p>
            <img src={disco.thumb} alt={disco.title} />
          </div>
        ))
    );
  };

  return (
    <div className="BandInfo__Wrapper">
      {artistState.isLoading && 'Loading Band Info...'}

      {artistState.isFailed && 'Error loading Band info.'}

      {artistState.isSuccess && (
        <Fragment>
          <h2>{artistState.data.name}</h2>
          {artistState.data.images && (
            <img
              src={artistState.data.images[0].uri}
              alt={`${artistState.data.name}`}
              className="BandInfo__image"
            />
          )}
          {artistState.data.profile && (
            <Fragment>
              <h3>BIOGRAFY</h3>
              <div className="biografy">{artistState.data.profile}</div>
            </Fragment>
          )}
          {artistState.data.members && (
            <Fragment>
              <h3>MEMBERS</h3>
              <div className="bandMembers">{bandMenbers()}</div>
            </Fragment>
          )}
          <div className="discography">
            {discoState.isLoading && 'LOADING DISCOGRAPHY INFO'}
            {discoState.isFailed && 'ERROR LOADING DISCOGRAPHY'}
            {discoState.data && discoState.data.length !== 0 && (
              <Fragment>
                <h3>DISCOGRAPHY</h3>
                <div className="discography">{bandDisco()}</div>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default BandInfo;
