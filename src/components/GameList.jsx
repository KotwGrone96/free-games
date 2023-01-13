import GameItem from './GameItem';
import { useState, useEffect, useRef } from 'react';
import { viewMore } from '../helpers/intersectionObsHelper';

export default function GameList({ list = [] }) {
  // La API no ofrece un endpoint con todos los géneros de juegos
  // por lo que de la lista recuperamos los géneros de cada juego y eliminamos duplicados
  // para poder obtener un array de valores únicos
  const genreList = list.map((el) => el.genre);
  const setGenreList = new Set(genreList); //Colección de valores únicos
  const genres = [...setGenreList]; //Convertimos a un array

  // El método viewMore nos permite recuperar cierta cantidad de los valores de un array
  // 1er param el array a iterar, 2do param la cantidad a recuperar,3er param a partir de qué índice empezar
  //Retorna el nuevo array, el último índice del array y un booleano para saber si hay más elementos para recuperar
  const { newArr, lastIndex } = viewMore(list, 20, 0);
  const [currentGenre, setCurrentGenre] = useState({ genre: '' });
  const [currentListGames, setCurrentListGames] = useState(newArr);
  const [lastGameVisible, setLastGameVisible] = useState(lastIndex);

  // Creamos una instancia de Intersection Observer para la carga progresiva de juegos y lo ponemos dentro de una referencia para evitar una nueva instancia en cada renderizado
  const observer = useRef(
    new IntersectionObserver((entries) => setEntries(entries), { threshold: 0.5 })
  );
  const [noMoreGames, setNoMoreGames] = useState(false); //Esta propiedad en true desconectará el observer
  const [pauseObserve, setPauseObserve] = useState(false); //Pausar el observador cuando filtemos por género de juego.
  const [entries, setEntries] = useState([]); //Entradas del observador

  const gameList = useRef(null); //Ref del contenedor de los juegos cargados y visibles

  const handleGenre = (genre) => {
    if (genre === currentGenre.genre) {
      setPauseObserve(false);
      setCurrentGenre({ genre: '' });
      const { newArr } = viewMore(list, lastGameVisible, 0);
      setCurrentListGames(newArr);
      return;
    }
    setPauseObserve(true);
    const arr = list.filter((el) => el.genre == genre);
    setCurrentListGames(arr);
    setCurrentGenre({ genre });
  };

  useEffect(() => {
    if (noMoreGames || pauseObserve) {
      observer.current.disconnect();
      return;
    }
    const gameCards = gameList.current.children;
    Object.values(gameCards).forEach((card) => {
      observer.current.observe(card);
    });
  }, [currentListGames]);

  useEffect(() => {
    const lastItem = gameList.current.children[gameList.current.children.length - 1];
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.current.unobserve(entry.target);
        if (entry.target === lastItem) {
          console.log('AGREGANDO MAS');
          const { newArr, lastIndex, noMore } = viewMore(list, 20, lastGameVisible);
          setCurrentListGames(currentListGames.concat(newArr));
          setLastGameVisible(lastIndex);
          noMore ? setNoMoreGames(noMore) : '';
        }
      }
    });
  }, [entries, observer]);

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
            onClick={() => handleGenre(genre)}
          >
            {genre}
          </span>
        ))}
      </div>
      {currentListGames.length == 0 ? (
        ''
      ) : (
        <div
          aria-label='list-games-container'
          className='w-full max-w-[1400px] m-auto flex justify-center flex-wrap gap-4'
          ref={gameList}
        >
          {currentListGames
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
      )}
    </>
  );
}
