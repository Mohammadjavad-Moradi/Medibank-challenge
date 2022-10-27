import { rest } from 'msw';

const mockData = [
  {
    name: 'Bob',
    gender: 'Male',
    age: 23,
    pets: [
      { name: 'Garfield', type: 'Cat' },
      { name: 'Fido', type: 'Dog' },
    ],
  },
  {
    name: 'Jennifer',
    gender: 'Female',
    age: 18,
    pets: [{ name: 'Garfield', type: 'Cat' }],
  },
  { name: 'Steve', gender: 'Male', age: 45, pets: null },
  {
    name: 'Fred',
    gender: 'Male',
    age: 40,
    pets: [
      { name: 'Tom', type: 'Cat' },
      { name: 'Max', type: 'Cat' },
      { name: 'Sam', type: 'Dog' },
      { name: 'Jim', type: 'Cat' },
    ],
  },
  {
    name: 'Samantha',
    gender: 'Female',
    age: 40,
    pets: [{ name: 'Tabby', type: 'Cat' }],
  },
  {
    name: 'Alice',
    gender: 'Female',
    age: 64,
    pets: [
      { name: 'Simba', type: 'Cat' },
      { name: 'Nemo', type: 'Fish' },
    ],
  },
];

export const handlers = [
  rest.get(
    `https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json`,
    (req, res, ctx) => {
      return res(ctx.json(mockData));
    }
  ),
];
