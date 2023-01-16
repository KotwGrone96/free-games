import { useContext } from 'react';
import { UserContext } from './../context/UserContext';

export default function WelcomeUser() {
  const context = useContext(UserContext);
  const { isLogged, user } = context;

  return isLogged ? (
    <h2 className='text-center text-2xl font-semibold italic text-white lg:text-2xl pb-4 xl:text-3xl'>
      Bienvenido{' '}
      <span
        style={{ textShadow: '2px 2px 5px #0a0, -2px -2px 5px #f00' }}
        className='text-2xl text-gray-200 xl:text-3xl'
      >
        {user.displayName}
      </span>
    </h2>
  ) : (
    ''
  );
}
