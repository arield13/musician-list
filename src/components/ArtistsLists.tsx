import React, { useEffect, useState } from 'react';
import AddArtistModal from './modals/AddArtistModal';
import AddSongModal from './modals/AddSongModal';
import { useAppContext } from '../context/AppContext';
import * as artistDataService from '../storage/artistDataService';

interface ArtistsListsProps {
    onArtistClick: (artist: any) => void;
}

const ArtistsLists = ({onArtistClick}: ArtistsListsProps) => {

    const { hideLeftColumn } = useAppContext();
    const [showAddArtistModal, setShowAddArtistModal] = useState(false);
    const [showAddSongModal, setShowAddSongModal] = useState(false);
    const [selectedArtistId, setSelectedArtistId] = useState<string | "">("");
    const [artists, setArtists] = useState(artistDataService.getAllArtists())
    const [artist, setArtist] = useState<any>()

    const handleArtistClick = (artist: any) => {
        setArtist(artist);
        // Toggle the selected state when an artist is clicked
        setSelectedArtistId((prevId) => prevId === artist.id ? "" : artist.id);
    };

    const removeArtist = () => {
        if (selectedArtistId) {
            artistDataService.deleteArtistById(selectedArtistId+'');
            setArtists(artistDataService.getAllArtists());
            setArtist(null);
            setSelectedArtistId("");
        }
    }

    useEffect(() => {
        onArtistClick(!!selectedArtistId ? artist : null);
    }, [selectedArtistId, artist]);

    const closeAddSongModal = () => {
        setArtists(artistDataService.getAllArtists());
        setArtist(artistDataService.getArtistById(artist.id))
        onArtistClick(artist);
        setShowAddSongModal(false);
    }

    const closeAddArtistModal = () => {
        setArtists(artistDataService.getAllArtists());
        setShowAddArtistModal(false);
    }
  
  return (
    <>
    {!hideLeftColumn? 
        <div className='left-column'>
            <div><label className='section-list-title'>Artist List Section</label></div>
            <br/>
            {artists.map((item, index) =>  (
                <div key={index} 
                    className={`artist-box ${selectedArtistId === item.id ? 'selected' : ''}`}
                    onClick={() => { handleArtistClick(item); }} >
                    <div><label className='section-title'>Artist Section</label></div>
                    <div><label className='label-title'>Name: </label>{item.name}</div>
                    <div><label className='label-title'>Nationality: </label>{item.nationality}</div>
                    <div><label className='label-title'>Age: </label>{item.age}</div>
                </div>
            ))}
            <div className='artist-buttons'>
                {/* Button to open Add Artist modal */} {/* Button to open Add Artist modal */}
                <button className='button-general' onClick={() => setShowAddArtistModal(true)}>Add Artist</button>
                {/* Button to open Add Song modal */}
                <button className='button-general' disabled={!(!!selectedArtistId)} onClick={() => setShowAddSongModal(true)}>Add Song</button>
                {/* Button to open Remove Artist modal */}
                <button className='button-general' disabled={!(!!selectedArtistId)} onClick={() => removeArtist()}>Remove Artist</button>
            </div>
            {showAddArtistModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        {/* Content of Add Artist modal */}
                        <button onClick={() => setShowAddArtistModal(false)}>Close</button>
                        <AddArtistModal closeAddArtistModal={closeAddArtistModal} />
                    </div>
                </div>
            )}

            {showAddSongModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        {/* Content of Add Song modal */}
                        <button onClick={() => setShowAddSongModal(false)}>Close</button>
                        <AddSongModal artist={artist} closeAddSongModal={closeAddSongModal} />
                    </div>
                </div>
            )}
        </div>
        :
        null
    } 
  </>
  );
};

export default ArtistsLists;
