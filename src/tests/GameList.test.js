import GameList from '../components/GameList';
import { screen, render } from '@testing-library/react';

global.IntersectionObserver = jest.fn(() => {
  return {
    observe: jest.fn(),
  };
});

beforeEach(() => {
  const list = [{ genre: 'genero1' }, { genre: 'genero2' }, { genre: 'genero3' }];
  render(<GameList list={list} />);
});

describe('Componente GameList', () => {
  test('La lista de juegos debería estar renderizada', () => {
    const container = screen.getByLabelText('list-games-container');
    expect(container).toBeInTheDocument();
  });
  test('La lista de juegos debería renderizar todos los elementos de la lista pasada por Props', () => {
    const container = screen.getByLabelText('list-games-container');
    expect(container.childElementCount).toBeGreaterThan(1);
  });
  test('Debería haber un filtro por categoría con todas las categorías de juegos cómo opciones', () => {
    const categoryFilter = screen.getByLabelText('category-filter');
    expect(categoryFilter).toBeInTheDocument();
    expect(categoryFilter.childElementCount).toBeGreaterThan(1);
  });
});
