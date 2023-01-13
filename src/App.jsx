import SearchGameInput from './components/SearchGameInput';
import useGames from './hooks/useGames';
import CardSkeleton from './components/CardSkeleton';
import GameList from './components/GameList';

export default function App() {
  const games = useGames();

  return (
    <>
      <main>
        <div
          aria-label='app'
          className='p-4'
        >
          <h1 className='text-center text-3xl font-semibold italic pb-4 text-white'>
            Games Free To Play
          </h1>
          {games.length == 0 ? (
            <div className='w-full max-w-7xl m-auto flex justify-center items-start gap-8 flex-wrap'>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <>
              <SearchGameInput list={games.data} />
              <GameList list={games.data} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
