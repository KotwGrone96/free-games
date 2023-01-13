import { viewMore } from '../helpers/intersectionObsHelper';

describe('Función viewMore', () => {
  const arr = [{}, {}, {}, {}, {}];
  test('La función debería retornar un array con la cantidad pasada en el 2do parámetro', () => {
    const { newArr } = viewMore(arr, 3, 0);
    expect(newArr.length).toBe(3);
  });
  test('La función debería retornar un booleano que sea true cuando ya no haya más elementos para recuperar del array pasado en el 1er parámetro', () => {
    const { noMore } = viewMore(arr, 6, 0);
    expect(noMore).toBeTruthy();
  });
  test('La función debería retornar un número que referencia el último índice del elemento agregado el nuevo array.', () => {
    const { lastIndex } = viewMore(arr, 1, 3);
    expect(lastIndex).toBe(4);
  });
});
