import { useState, useContext } from 'react';
import LogInForm from './LogInForm';
import { UserContext } from '../context/UserContext';
import { signOut, getAuth } from 'firebase/auth';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  const context = useContext(UserContext);
  const { isLogged, setIsLogged, setUser } = context;

  const logOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsLogged(false);
        setUser({});
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <header className='w-full flex justify-center gap-6 items-center bg-purple-900 py-6 fixed z-[1000] lg:justify-center'>
      <h1 className='text-center text-xl font-semibold italic text-white lg:text-2xl'>
        Games Free To Play
      </h1>
      {isLogged ? (
        <button
          onClick={logOut}
          className='py-1 px-5 text-white bg-red-700 rounded-full lg:absolute lg:right-32 lg:text-lg hover:bg-red-500 transition-colors'
        >
          Salir
        </button>
      ) : (
        <button
          onClick={() => setIsVisible(true)}
          className='py-1 px-3 text-white bg-blue-700 rounded-full lg:absolute lg:right-32 lg:text-lg hover:bg-blue-500 transition-colors'
        >
          Ingresar
        </button>
      )}
      {isVisible ? <LogInForm setIsVisible={setIsVisible} /> : ''}
    </header>
  );
}
