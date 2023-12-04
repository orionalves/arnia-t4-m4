import { sum } from './sum';

describe('Testing sum function', () => {
  it('Should sum +3 +2 and return 5', () => {
    const result = sum(3, 2);

    expect(result).toEqual(5);
  });

  it('Should sum -1 +2 and return 1', () => {
    const result = sum(-1, 2);

    expect(result).toEqual(1);
  });

  it('Should sum -1 -2 and return -3', () => {
    const result = sum(-1, -2);

    expect(result).toEqual(-3);
  });
});
