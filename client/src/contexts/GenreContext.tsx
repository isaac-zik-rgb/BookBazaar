import React, { createContext, useContext, useState } from 'react';

const GenreContext = createContext<{
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}>({ selectedGenre: '', setSelectedGenre: () => {} });

export const useGenre = () => useContext(GenreContext);

export const GenreProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedGenre, setSelectedGenre] = useState('');

  return (
    <GenreContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </GenreContext.Provider>
  );
};
