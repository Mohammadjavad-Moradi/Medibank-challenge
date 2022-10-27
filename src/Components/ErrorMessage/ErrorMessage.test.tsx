import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorMessage from './ErrorMessage.component';

test('Error message show in right position', () => {
  render(<ErrorMessage message="Error message" />);

  const message = screen.getByText('Error message');
  expect(message).toBeInTheDocument();
  expect(message).toHaveStyle({ color: '#fff', backgroundColor: '#cc3f3f' });
});
