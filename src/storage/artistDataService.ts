  // Define interfaces for Artist and Song
  interface Artist {
    id: string;
    name: string;
    nationality: string;
    age: number;
    songs: Song[];
  }
  
  interface Song {
    id: string;
    title: string;
    lyrics: string;
    composer: string;
    producer: string;
    productionDate: string;
    awards: string[];
  }
  
  // Define methods for interacting with localStorage
  
  // Get all artists
  export const getAllArtists = (): Artist[] => {
    const artistsData = localStorage.getItem('artists');
    return artistsData ? JSON.parse(artistsData) : [];
  };
  
  // Get an artist by ID
  export const getArtistById = (id: string): Artist | undefined => {
    const artists = getAllArtists();
    return artists.find((artist) => artist.id === id);
  };
  
  // Add a new artist
  export const addArtist = (newArtist: Artist): void => {
    const artists = getAllArtists();
    artists.push(newArtist);
    localStorage.setItem('artists', JSON.stringify(artists));
  };
  
  // Delete an artist by ID
  export const deleteArtistById = (id: string): void => {
    const artists = getAllArtists().filter((artist) => artist.id !== id);
    localStorage.setItem('artists', JSON.stringify(artists));
  };
  
  // Add a song to an artist by ID
  export const addSongToArtist = (id: string, newSong: Song): void => {
    const artists = getAllArtists();
    const updatedArtists = artists.map((artist) => {
      if (artist.id === id) {
        artist.songs.push(newSong);
      }
      return artist;
    });
    localStorage.setItem('artists', JSON.stringify(updatedArtists));
  };
  
  // Delete a song from an artist by ID and Song ID
  export const deleteSongFromArtist = (artistId: string, songId: string): void => {
    const artists = getAllArtists();
    const updatedArtists = artists.map((artist) => {
      if (artist.id === artistId) {
        artist.songs = artist.songs.filter((song) => song.id !== songId);
      }
      return artist;
    });
    localStorage.setItem('artists', JSON.stringify(updatedArtists));
  };
  
  export {};
  // Example Usage:
  
  // Add a new artist
//   const newArtist: Artist = {
//     id: '1',
//     name: 'John Doe',
//     nationality: 'American',
//     age: 30,
//     songs: [],
//   };
//   addArtist(newArtist);
  
//   // Add a song to an artist by ID
//   const newSong: Song = {
//     id: '1',
//     title: 'Sample Song',
//     lyrics: 'Lyrics for the sample song',
//     composer: 'Composer Name',
//     producer: 'Producer Name',
//     productionDate: '2023-12-31',
//     awards: ['Award 1', 'Award 2'],
//   };
//   addSongToArtist('1', newSong);
  