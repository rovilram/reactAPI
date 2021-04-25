import { useCallback, useState } from 'react';
import apiFetch from '../../data/dataProvider';

export default function useFetchArtists() {
  const [fetchState, setFetchState] = useState({
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    data: null,
    error: null,
  });

  /*     const artist = await apiFetch(URL);
    return artist; */

  const fetchData = useCallback(async function (searchText) {
    const discogsConf = {
      TOKEN: 'UTtvCaiWDvNQrjQUXmBqZncsMQzXXMrrsOvlTujQ',
      URL: 'https://api.discogs.com/',
      HEADER: [
        'User-Agent',
        'accept: application/json',
        'Content-Type: application/json',
        'musicAPIs v0.1 https://rovilram.github.io/musicAPI/',
      ],
    };

    const URL = `${discogsConf.URL}/database/search?q=${searchText}&token=${discogsConf.TOKEN}&type=artist&per_page=10`;

    try {
      setFetchState({
        isLoading: true,
        isSuccess: false,
        isFailed: false,
        error: null,
        data: null,
      });
      const result = await apiFetch(URL, discogsConf.HEADER);
      setFetchState({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
        error: null,
        data: result.results,
      });
      return result;
    } catch (error) {
      setFetchState({
        isLoading: false,
        isSuccess: false,
        isFailed: true,
        error,
        data: null,
      });
    }
  }, []);

  return [fetchState, fetchData];
}
