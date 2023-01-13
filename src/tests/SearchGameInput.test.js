import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SearchGameInput from '../components/SearchGameInput';

afterEach(cleanup);

describe('El componente SearchGameInput debería estar renderizado con un input y una lista', () => {
  beforeEach(() => {
    const list = [{}, {}, {}];
    render(<SearchGameInput list={list} />);
  });

  test('El input de busqueda de juegos debería estar renderizado', () => {
    const input = screen.getByPlaceholderText('Escriba el nombre del juego');
    expect(input).toBeInTheDocument();
  });

  test('La lista de juegos debería estar renderizada', () => {
    const gameList = screen.getByLabelText('input-game-list');
    expect(gameList).toBeInTheDocument();
  });
  test('La lista de juegos debería renderizar la lista pasada por props', () => {
    const gameList = screen.getByLabelText('input-game-list');
    expect(gameList.childElementCount).toBeGreaterThan(1);
  });
});

describe('El componente SearchGameInput debería controlar el cambio de estado del input y filtrar la lista en base al input value', () => {
  let list = [{ title: 'Juego 1' }, { title: 'Juego 2' }, { title: 'Juego 3' }];
  let input;
  let gameList;

  beforeEach(() => {
    render(<SearchGameInput list={list} />);
    input = screen.getByPlaceholderText('Escriba el nombre del juego');
    gameList = screen.getByLabelText('input-game-list');
  });
  test('La lista debería empezar con display none en tailwind => hidden', () => {
    expect(gameList).toHaveClass('hidden');
  });

  test('La lista debería mostrase solo cuando el input tenga valor, de lo contrario no debería mostrarse', () => {
    const handleChange = jest.fn();
    input.addEventListener('change', handleChange);
    fireEvent.change(input, { target: { value: 'Juego 1' } });
    expect(gameList).toHaveClass('flex');
  });

  test('La lista debería filtrarse en base al input value', () => {
    const handleChange = jest.fn();
    input.addEventListener('change', handleChange);
    fireEvent.change(input, { target: { value: 'Juego 1' } });
    expect(gameList.childElementCount).toBeLessThan(3);
  });
});
