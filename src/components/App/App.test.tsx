import { render } from '@testing-library/react';
import React from 'react';

import { App } from './App';

test('renders hello.', () => {
  const { getByText } = render(<App />);
  const helloText = getByText(/Echo/i);
  expect(helloText).toBeInTheDocument();
});
