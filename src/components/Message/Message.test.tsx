import React from 'react';
import { render } from '@testing-library/react';
import { Message } from './Message';

test('renders Message', () => {
  const { getByText } = render(<Message />);
  const text = getByText(/Message/i);
  expect(text).toBeInTheDocument();
});
