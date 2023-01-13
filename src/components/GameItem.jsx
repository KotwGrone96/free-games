export default function GameItem({ title, thumbnail, description, platform, genre, gameUrl }) {
  return (
    <a
      aria-label='game-item'
      className='w-full max-w-xs p-4 rounded-lg bg-gray-900 text-white cursor-pointer hover:bg-gray-600 transition-colors block'
      href={gameUrl}
      target='_blank'
    >
      <img
        src={thumbnail}
        alt={title}
        placeholder='game-poster'
        title={title}
      />
      <h3 className='pt-4 font-medium'>{title}</h3>
      <p className='overflow-hidden text-ellipsis whitespace-nowrap py-2 text-gray-300'>
        {description}
      </p>
      <div className='w-full items-center flex justify-between'>
        <span>{platform}</span>
        <span className='bg-gray-700 px-2 py-1 rounded-lg'>{genre}</span>
      </div>
    </a>
  );
}
