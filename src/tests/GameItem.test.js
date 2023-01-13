import { screen, render, cleanup } from '@testing-library/react';
import GameItem from '../components/GameItem';

afterEach(cleanup);

describe('Componente GameItem', () => {
  const props = {
    title: 'Nombre del juego',
    thumbnail: 'poster del juego',
    short_description: 'descripción',
    platform: 'Plataforma',
    genre: 'género',
    game_url: 'url',
  };
  let item;
  beforeEach(() => {
    render(
      <GameItem
        title={props.title}
        thumbnail={props.thumbnail}
        description={props.short_description}
        platform={props.platform}
        genre={props.genre}
        gameUrl={props.game_url}
      />
    );
    item = screen.getByLabelText('game-item');
  });
  test('El componente debería estar renderizado', () => {
    expect(item).toBeInTheDocument();
  });
  test('El componente debería mostrar el título', () => {
    expect(item).toHaveTextContent(props.title);
  });
  test('El componente debería mostrar una descripción', () => {
    expect(item).toHaveTextContent(props.short_description);
  });
  test('El componente debería mostrar una plataforma', () => {
    expect(item).toHaveTextContent(props.platform);
  });
  test('El componente debería mostrar un género', () => {
    expect(item).toHaveTextContent(props.genre);
  });
  test('El componente debería tener el atributo HREF con el valor gameUrl pasado por props', () => {
    expect(item).toHaveAttribute('href', props.game_url);
  });
  test('El componente debería tener el atributo TARGET con el valor _black', () => {
    expect(item).toHaveAttribute('target', '_blank');
  });
  test('El componente debería mostrar su poster en una etiqueta img con los atributos SRC, ALT, TITLE', () => {
    const img = screen.getByPlaceholderText('game-poster');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', props.thumbnail);
    expect(img).toHaveAttribute('alt', props.title);
    expect(img).toHaveAttribute('title', props.title);
  });
});
