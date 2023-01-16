import GoogleIcon from './../assets/google.svg';
import TwitterIcon from './../assets/twitter.svg';
import FbLoginIcon from './../assets/fb.svg';
import { useState, useContext, useRef } from 'react';
import googleLogIn from '../helpers/googleLogIn';
import { UserContext } from '../context/UserContext';
import TwitterLogIn from '../helpers/TwitterLogIn';
import facebookLogIn from '../helpers/facebookLogIn';
import { addEmailuser, emailLogin } from '../helpers/emailLogin';

export default function LogInForm({ setIsVisible }) {
  const [register, setRegister] = useState(false);
  const context = useContext(UserContext);
  const { setUser, setIsLogged } = context;
  const form = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const email = formData.get('email');
    const password = formData.get('password');
    if (register) {
      await addEmailuser(email, password);
      window.alert('Usuario agregado exitosamente');
      form.current.reset();
    }
    const user = await emailLogin(email, password);
    if (user == undefined) {
      window.alert('Lo sentimos, el usuario no existe');
      return;
    }
    setUser(user);
    setIsVisible(false);
    setIsLogged(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegister(!register);
  };

  const handleGoogleLogIn = async () => {
    const user = await googleLogIn();
    if (user == undefined) return;
    setUser(user);
    setIsVisible(false);
    setIsLogged(true);
  };

  const handleTwitterLogIn = async () => {
    const user = await TwitterLogIn();
    if (user == undefined) return;

    setUser(user);
    setIsVisible(false);
    setIsLogged(true);
  };
  const handleFbLogIn = async () => {
    const user = await facebookLogIn();
    if (user == undefined) return;

    setUser(user);
    setIsVisible(false);
    setIsLogged(true);
  };

  return (
    <>
      <div
        id='authentication-modal'
        tabIndex={-1}
        aria-hidden='true'
        className='fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-black/50 min-h-screen w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'
      >
        <div className='relative w-full h-full max-w-md md:h-auto'>
          {/* Modal content */}
          <div className='relative rounded-lg shadow bg-gray-700'>
            <button
              type='button'
              className='absolute top-3 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-gray-300'
              data-modal-hide='authentication-modal'
              onClick={() => setIsVisible(false)}
            >
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='px-6 py-6 lg:px-8'>
              <h3 className='mb-4 text-xl font-medium  text-white'>
                {register ? 'Registrarse' : 'Ingresar a Games Free To Play'}
              </h3>
              <form
                ref={form}
                className='space-y-6'
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-white'
                  >
                    Correo
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                    placeholder='email@email.com'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-white'
                  >
                    Contraseña
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                    required
                  />
                </div>
                {register ? (
                  ''
                ) : (
                  <>
                    <button
                      type='button'
                      className='w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-600 hover:bg-gray-500 focus:ring-gray-800 text-gray-200 border-gray-500 flex justify-center gap-4 items-center'
                      onClick={handleGoogleLogIn}
                    >
                      <img
                        src={GoogleIcon}
                        alt='google'
                        className='w-6 h-6'
                      />
                      Ingresar con Google
                    </button>
                    <button
                      type='button'
                      onClick={handleTwitterLogIn}
                      className='w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-600 hover:bg-gray-500 focus:ring-gray-800 text-gray-200 border-gray-500 flex justify-center gap-4 items-center'
                    >
                      <img
                        src={TwitterIcon}
                        alt='google'
                        className='w-6 h-6'
                      />
                      Ingresar con Twitter
                    </button>
                    <button
                      type='button'
                      onClick={handleFbLogIn}
                      className='w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-600 hover:bg-gray-500 focus:ring-gray-800 text-gray-200 border-gray-500 flex justify-center gap-4 items-center'
                    >
                      <img
                        src={FbLoginIcon}
                        alt='google'
                        className='w-6 h-6'
                      />
                      Ingresar con Facebook
                    </button>
                  </>
                )}

                {register ? (
                  <>
                    <button
                      type='submit'
                      className='w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-white'
                    >
                      Registrarse
                    </button>
                    <div className='text-sm font-medium text-gray-300'>
                      ¿Ya tenés cuenta?{' '}
                      <a
                        href='#'
                        onClick={handleRegister}
                        className='hover:underline text-blue-500'
                      >
                        Iniciar Sesión
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      type='submit'
                      className='w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-white'
                    >
                      Ingresar
                    </button>
                    <div className='text-sm font-medium text-gray-300'>
                      ¿No estás registrado?{' '}
                      <a
                        href='#'
                        onClick={handleRegister}
                        className='hover:underline text-blue-500'
                      >
                        Registrarse
                      </a>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
