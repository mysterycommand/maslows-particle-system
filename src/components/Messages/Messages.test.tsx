import React from 'react';
import { render } from '@testing-library/react';
import { Messages } from './Messages';

test('renders Messages', () => {
  const { getByText } = render(<Messages />);
  const text = getByText(/Messages/i);
  expect(text).toBeInTheDocument();
});
