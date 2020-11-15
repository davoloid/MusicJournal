import getSpotifyToken from '../../utils/getSpotifyToken';
import SpotifyWebApi from 'spotify-web-api-node';

export default async function handler(req, res) {
    const Spotify = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.AUTH_REDIRECT_URL,
    });
    const token = await getSpotifyToken()

    if (token) {
        Spotify.setAccessToken(token)
    } else {
        throw Error('Token not set')
    }

    try {
        const data = await Spotify.getMyRecentlyPlayedTracks({ limit: 20 })
        let recentSongs = []
        //higher number = more time since listened
        let recentTrackOrder = 0;
        data.body.items.forEach(item => {
            console.log(item.track);
            recentSongs.push({
                position: recentTrackOrder,
                trackName: item.track.name,
                description: `${item.track.name} by ${item.track.artists[0].name}`,
                image: item.track.album.images[0],
                track: item.track,
            });
            recentTrackOrder += 1;
        });
        res.send(recentSongs);
    }
    catch (error) {
        console.log('Something went wrong!', error);
    }
}
