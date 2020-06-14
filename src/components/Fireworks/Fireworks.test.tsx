import React from 'react';
import { render } from '@testing-library/react';
import { Fireworks } from './Fireworks';

test('renders Fireworks', () => {
  const { getByText } = render(<Fireworks />);
  const text = getByText(/Fireworks/i);
  expect(text).toBeInTheDocument();
});
