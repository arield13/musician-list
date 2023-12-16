import React, { Fragment, useEffect, useState } from 'react';
import SongsArtistModal from './modals/SongsArtistModal';
import { useAppContext } from '../context/AppContext';

interface ArtistDetailProps {
    selectedArtist: any;
    selectedSong: any;
    updateSong: (song: any) => void
}
const ArtistDetail = ({selectedArtist, selectedSong, updateSong} : ArtistDetailProps) => {
  const { toggleHideLeftColumn } = useAppContext();
  const [buttonMenu, setButtonMenu] = useState(true);
  const [showSongsModal, setShowSongsModal] = useState(false);
  const [selectedLiryc, setSelectedLiryc] = useState(selectedArtist?.songs[0]?.lyrics);

  useEffect(() => {
   setSelectedLiryc(selectedArtist?.songs[0]?.lyrics)
  }, [selectedLiryc, selectedArtist]);

  const toggleArtist = () => {
    toggleHideLeftColumn();
    setButtonMenu((prevHideButtonMenu) => !prevHideButtonMenu);
  }

  const _updateSong = (song: any) => {
    setShowSongsModal(false);
    updateSong(song);
  }

  return (
    <>
    <div className="right-column">
      <div><label className='section-list-title'>Artist Detail Section</label></div>
      <br/>
      <div className="artist-details" id="artist-details">
        <div className="menu">
            <button className="left-btn" onClick={() => { setShowSongsModal(true) }}>
                <svg viewBox="0 0 100 60" width="26" height="28">
                    <rect width="100" height="5"></rect>
                    <rect y="32" width="100" height="5"></rect>
                    <rect y="59" width="100" height="5"></rect>
                </svg> 
            </button>
            <div className='artist-label'> 
                {selectedArtist && selectedArtist.name? selectedArtist.name : ""}
                {selectedSong?.title ? `: song ${selectedSong?.title}` : "" }
            </div>
            <button className="right-btn">
                {buttonMenu? 
                    <img alt='icon menu' onClick={() => {toggleArtist()}} src="./icons8-external-link-48.png" className='icon-menu'/> 
                    :
                    <img alt='icon back' onClick={() => {toggleArtist()}} src="./back-button-svgrepo-com.png" className='icon-menu'/>
                } 
            </button>
        </div>
        <div className="lyric-details">
          {selectedSong?.title ?
            <>
                <div><label className='section-detail-title'> {selectedSong?.title ? `song ${selectedSong?.title} lyrics` : "" }</label></div>
                <p id="lyric-text">
                    <pre>
                        {selectedSong?.lyrics}
                    </pre>
                </p>
            </>
          : null}
        </div>
        <div className="author-details">
           {selectedSong?.title ?
            <>
                <div><label className='section-detail-title'> {selectedSong?.title ? `song ${selectedSong?.title} detail` : "" }</label></div>
                <br/>
                <div><label className='label-title'> Composer: </label> {selectedSong?.composer}</div>
                <div><label className='label-title'> Producer: </label> {selectedSong?.producer}</div>
                <div><label className='label-title'> Production Date: </label> {selectedSong?.productionDate}</div>
                <div><label className='label-title'> Awards: </label> {selectedSong?.awards}</div>
            </>
            :
            null}
        </div>
      </div>
    </div>
    {showSongsModal && (
        <div className="modal-overlay">
            <div className="modal">
                {/* Button to open Songs Artist modal */}
                <button onClick={() => setShowSongsModal(false)}>Close</button>
                <SongsArtistModal artistId={selectedArtist.id} _updateSong={_updateSong} />
            </div>
        </div>
      )}
    </>
  );
};

export default ArtistDetail;
