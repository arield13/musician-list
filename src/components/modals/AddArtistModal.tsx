import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import * as artistDataService from '../../storage/artistDataService';

const AddArtistModal: React.FC<{closeAddArtistModal: () => void}> = ({closeAddArtistModal}) => {
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddArtist = () => {
    if (name.trim() === '' || nationality.trim() === '' || age.trim() === '') {
        setError('Please fill out the form!');
        return;
    }

    const newArtist = {
      id: uuidv4(), // Generate a unique ID for the artist
      name,
      nationality,
      age: parseInt(age), // Convert age to number (assuming age is a number)
      songs: [], // Initialize songs as an empty array for the new artist
    };

    artistDataService.addArtist(newArtist); // Add the artist to localStorage
    setName('')
    setNationality('')
    setAge('')
    setError('');
    setSuccess('Artist added!');
    closeAddArtistModal();
  };

  return (
    <div>
      <h2>Add New Artist</h2>
      <form>
        <div>
          <label className='label-form-title'>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className='label-form-title'>Nationality:</label>
          <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} />
        </div>
        <div>
          <label className='label-form-title'>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button className='button-submit' type="button" onClick={handleAddArtist}>Add Artist</button>
      </form>
    </div>
  );
};

export default AddArtistModal;
