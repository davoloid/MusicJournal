import React from 'react';
import TopArtists from '../components/TopArtists';
import TopTracks from '../components/TopTracks';
import withAuth from '../src/withAuth';

const Dashboard = () => (
  <>
    <TopArtists />
    <TopTracks />
  </>
)
export default withAuth(Dashboard);
