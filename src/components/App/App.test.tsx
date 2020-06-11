import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders hello.', () => {
  const { getByText } = render(<App />);
  const helloText = getByText(/hello\./i);
  expect(helloText).toBeInTheDocument();
});
