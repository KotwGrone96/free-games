import { useState } from 'react';

export default function SearchGameInput({ list = [] }) {
  const [inputVal, setInputVal] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value == '') {
      setIsVisible(false);
      setInputVal('');
      return;
    }
    setIsVisible(true);
    setInputVal(value);
  };

  return (
    <div className='relative w-full max-w-lg m-auto'>
      <input
        type='text'
        placeholder='Escriba el nombre del juego'
        onChange={handleChange}
        value={inputVal}
        className='w-full text-white m-auto max-w-lg p-2 rounded-lg mb-6 outline-none bg-gray-900 placeholder:text-gray-400 block'
      />

      <ul
        aria-label='input-game-list'
        className={`${
          isVisible ? 'flex' : 'hidden'
        } justify-center items-center flex-col w-full bg-gray-700 absolute top-9 text-white overflow-y-scroll overflow-x-hidden max-h-[250px]`}
      >
        {list
          .filter((el) => {
            if (inputVal == '') return true;
            const { title } = el;
            return title.toLocaleLowerCase().includes(inputVal.toLocaleLowerCase());
          })
          .map((el, index) => (
            <li
              key={index}
              className='w-full h-10 only:border-b-[1px] hover:bg-slate-900'
            >
              <a
                href={el.game_url}
                className='w-full flex justify-between p-2'
                target='_blank'
              >
                <p>{el.title}</p>{' '}
                <span className='bg-gray-500 px-2 py-1 rounded-lg text-xs'>{el.genre}</span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
