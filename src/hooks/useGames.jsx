import { useState, useEffect } from 'react';
import AppLoder from '../helpers/AppLoder';

export default function useGames() {
  const [games, setGames] = useState([]);
  const updateGames = async () => {
    const games = await AppLoder();
    setGames(games);
  };
  useEffect(() => {
    updateGames();
  }, []);
  return games;
}
