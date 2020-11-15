import React, { useEffect, useState } from 'react';

const fetcher = (url) =>
    fetch(url, {
        method: 'GET',
    }).then((res) => res.json());

const TopArtists = () => {
    const [topArtists, setTopArtists] = useState()

    useEffect(() => {
        fetcher('/api/top-artists-from-spotify').then((json) => {
            setTopArtists(json);
        });
    }, [])

    if (!topArtists) {
        return <div>No top artists yet...</div>
    }

    return (
        <div>
            <h2>Top Artists</h2>
            {topArtists && topArtists.map(({name}) => <div key={name}>{name}</div>)}
        </div>
    )
}

export default TopArtists;
