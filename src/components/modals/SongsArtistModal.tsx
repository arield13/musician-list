import React from 'react';
import * as artistDataService from '../../storage/artistDataService';

interface SongsArtistModalProps {
    artistId: string, 
    _updateSong: (song: any) => void 
}

const SongsArtistModal = ({ artistId, _updateSong } : SongsArtistModalProps) => {
  const artist = artistDataService.getArtistById(artistId); // Fetch artist data
  const handleSongSelection = (song: any) => {
    _updateSong(song)
  };

  return (
    <div>
        <h2>Songs Artist</h2>
        <ul className="row-list">
          {artist?.songs.map((song) => (
            <li key={song.id} onClick={() => handleSongSelection(song)}>
              {song.title}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default SongsArtistModal;
