import React from 'react';
import { render } from '@testing-library/react';
import { Fireworks } from './Fireworks';

test('renders Fireworks', () => {
  const { container } = render(<Fireworks />);
  const canvas = container.querySelector('canvas');
  expect(canvas).toBeInTheDocument();
});
