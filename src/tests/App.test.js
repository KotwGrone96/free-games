import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          title: 'Nombre del juego',
          thumbnail: 'poster del juego',
          short_description: 'descripción',
          platform: 'Plataforma',
          genre: 'género',
          game_url: 'url',
        },
        {
          title: 'Nombre del juego 2',
          thumbnail: 'poster del juego 2',
          short_description: 'descripción 2',
          platform: 'Plataforma 2',
          genre: 'género 2',
          game_url: 'url 2',
        },
      ]),
  })
);

describe('La aplicación debe renderizar correctamente', () => {
  test('Componente App debería renderizarse', async () => {
    await act(async () => render(<App />));
    const list = screen.getByLabelText('input-game-list');
    expect(list.childElementCount).toBeGreaterThan(1);
  });
});
