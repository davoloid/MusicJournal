import firebase from 'firebase';
import firebaseAdmin from 'firebase-admin';
import serviceAccount from '../service-account.json';

const getSpotifyToken = async (Spotify) => {
    if (!firebaseAdmin.apps.length) {
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
        });
    }

    const { currentUser } = firebase.auth();
    const ref = await firebaseAdmin.database().ref(`/spotifyAccessToken/${currentUser.uid}`);
    let token;

    try {
        await ref.orderByValue().once("value", snapshot => {
            token = snapshot.node_.value_;
        })
    }
    catch (error) {
        console.log('Could not get token', error)
        token = undefined
    }

    return token;
};

export default getSpotifyToken;
