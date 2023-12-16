import React, { useEffect, useState } from 'react';
import MainMenu from './MainMenu';
import ArtistsLists from './ArtistsLists';
import ArtistDetail from './ArtistDetail';
import { AppProvider } from '../context/AppContext';

const MainContainer = () => {
    const [selectedArtist, setSelectedArtist] = useState<any>(null);
    const [selectedSong, setSelectedSong] = useState<any>(null);
    const handleClickArtist = (artist: any) => {
        setSelectedArtist(artist);
        setSelectedSong(artist?.songs[0])
    }

    const updateSong = (song: any) => {
        setSelectedSong(song)
    };

    useEffect(() => {
    }, [selectedArtist, selectedSong]);

  return (
    <AppProvider>
        <div className="main-container">
            <MainMenu />
            <div className="content">
                <ArtistsLists onArtistClick={handleClickArtist}/>
                <ArtistDetail updateSong={updateSong} selectedArtist={selectedArtist} selectedSong={selectedSong} />
            </div>
        </div>
    </AppProvider>
  );
};

export default MainContainer;
