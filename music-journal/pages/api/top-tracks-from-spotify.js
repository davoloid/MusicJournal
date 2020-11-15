import getSpotifyToken from '../../utils/getSpotifyToken'
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
        const data = await Spotify.getMyTopTracks()
        const topTracks = data.body.items;
        res.send(topTracks);
    }
    catch (error) {
        console.log(error)
    }
}
