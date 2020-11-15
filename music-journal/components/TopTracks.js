import React, { useEffect, useState } from 'react';

const fetcher = (url) =>
    fetch(url, {
        method: 'GET',
    }).then((res) => res.json());

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState()

    useEffect(() => {
        fetcher('/api/top-tracks-from-spotify').then((json) => {
            setTopTracks(json);
        });
    }, [])

    if (!topTracks) {
        return <div>No top tracks yet...</div>
    }

    return (
        <div>
            <h2>Top Tracks</h2>
                {topTracks && topTracks.map(({name, artists}) => 
                    <div key={name}>
                        {name} - {artists[0].name}
                    </div>
                )}
        </div>
    )
}

export default TopTracks;
