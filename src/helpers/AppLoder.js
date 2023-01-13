import { API_KEY } from './../secret/appKeys';

export default async function AppLoder() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    },
  };
  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options);
  const data = await res.json();
  return { data };
}
