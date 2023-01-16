import SearchGameInput from './components/SearchGameInput';
import useGames from './hooks/useGames';
import CardSkeleton from './components/CardSkeleton';
import GameList from './components/GameList';
import Header from './components/Header';
import { app } from './secret/firebase';
import { UserContextProvider } from './context/UserContext';
import WelcomeUser from './components/WelcomeUser';

export default function App() {
  const games = useGames();

  return (
    <UserContextProvider>
      <Header />
      <main className='pt-20'>
        <div
          aria-label='app'
          className='p-4'
        >
          {games.length == 0 ? (
            <div className='w-full max-w-7xl m-auto flex justify-center items-start gap-8 flex-wrap'>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <>
              <WelcomeUser />
              <SearchGameInput list={games.data} />

              <GameList list={games.data} />
            </>
          )}
        </div>
      </main>
    </UserContextProvider>
  );
}
