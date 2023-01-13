import GameItem from './GameItem';
import { useState } from 'react';

export default function GameList({ list = [] }) {
  const genreList = list.map((el) => el.genre);
  const setGenreList = new Set(genreList);
  const genres = [...setGenreList];

  const [currentGenre, setCurrentGenre] = useState({ activeIndex: false, genre: '' });

  const handleGenre = (genre, activeIndex) => {
    genre === currentGenre.genre
      ? setCurrentGenre({ genre: '', activeIndex: false })
      : setCurrentGenre({ genre, activeIndex });
  };

  return (
    <>
      <div
        aria-label='category-filter'
        className='w-full max-w-5xl m-auto flex justify-center items-center flex-wrap gap-2 pb-6'
      >
        {genres.map((genre, index) => (
          <span
            key={index}
            className={`${
              currentGenre.genre === genre ? 'bg-slate-900 border' : 'bg-gray-700'
            } text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-900`}
            onClick={() => handleGenre(genre, index)}
          >
            {genre}
          </span>
        ))}
      </div>
      <div
        aria-label='list-games-container'
        className='w-full max-w-[1400px] m-auto flex justify-center flex-wrap gap-4'
      >
        {list
          .filter((el) => {
            if (currentGenre.genre == '') return true;
            const { genre } = el;
            return genre.toLowerCase().includes(currentGenre.genre.toLowerCase());
          })
          .map((el, index) => (
            <GameItem
              key={index}
              title={el.title}
              genre={el.genre}
              platform={el.platform}
              thumbnail={el.thumbnail}
              description={el.short_description}
              gameUrl={el.game_url}
            />
          ))}
      </div>
    </>
  );
}
