import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import * as artistDataService from '../../storage/artistDataService';

const AddSongModal: React.FC<{ artist: any, closeAddSongModal: () => void }> = ({ artist, closeAddSongModal }) => {
    
  const [title, setTitle] = useState('');
  const [composer, setComposer] = useState('');
  const [producer, setProducer] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [awards, setAwards] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [lyrics, setLyrics] = useState('');

  const handleAddSong = () => {
    if (title.trim() === '' || composer.trim() === '' || producer.trim() === '' || productionDate.trim() === '' || awards.trim() === '') {
        setError('Please fill out the form!');
        return;
    }

    const newSong = {
      id: uuidv4(), // Generate a unique ID for the song
      title,
      composer,
      producer,
      productionDate,
      awards: awards.split(',').map((award: string) => award.trim()), // Split awards string into an array
      lyrics,
    };

    artistDataService.addSongToArtist(artist.id, newSong); // Add the song to the artist in localStorage
    setTitle("");
    setComposer("");
    setProducer("");
    setProductionDate("");
    setAwards("");
    setError('');
    setLyrics('')
    setSuccess('Song added!');
    closeAddSongModal();
  };

  return (
    <div>
      <h2>Add New Song to ({artist.name})</h2>
      <form className='form-songs'>
        <div>
          <label className='label-form-title'>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className='label-form-title'>Composer:</label>
          <input type="text" value={composer} onChange={(e) => setComposer(e.target.value)} />
        </div>
        <div>
          <label className='label-form-title'>Producer:</label>
          <input type="text" value={producer} onChange={(e) => setProducer(e.target.value)} />
        </div>
        <div>
          <label className='label-form-title'>Production Date:</label>
          <input type="date" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} />
        </div>
        <div>
          <label className='label-form-title'>Awards:</label>
          <input type="text" value={awards} onChange={(e) => setAwards(e.target.value)} />
        </div>
        <div>
          <label className='label-form-title'>Lyrics:</label>
          <textarea value={lyrics} onChange={(e) => setLyrics(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button className='button-submit' type="button" onClick={handleAddSong}>Add Song</button>
      </form>
    </div>
  );
};

export default AddSongModal;
