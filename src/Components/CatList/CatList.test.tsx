import React from 'react';
import { screen, render, within, waitFor } from '@testing-library/react';
import CatList from './CatList.components';
import { rest } from 'msw';
import { server } from '../../mocks/server';

describe('CatList tests', () => {
  beforeEach(() => {
    render(<CatList />);
  });
  test('fetch data from api and render cat list', async () => {
    //list of all cats in order
    const maleCatName = [
      'Garfield',
      'Jim',
      'Max',
      'Tom',
      'Garfield',
      'Simba',
      'Tabby',
    ];
    //test for titles
    const maleHeader = await screen.findByLabelText('Male');
    expect(maleHeader).toBeInTheDocument();

    const femaleHeader = await screen.findByLabelText('Female');
    expect(femaleHeader).toBeInTheDocument();

    //test for all cat names to be in the document in order
    const maleCats = await screen.findAllByRole(`listitem`);
    maleCats.forEach((item, index) => {
      const { getByText } = within(item);
      expect(getByText(maleCatName[index])).toBeInTheDocument();
    });
  });
  test('in case of error expect error message appears', async () => {
    server.resetHandlers(
      rest.get(
        `https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json`,
        (req, res, ctx) => {
          res(ctx.status(500));
        }
      )
    );
    waitFor(async () => {
      const errorMessage = await screen.findByText('Something went wrong');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
