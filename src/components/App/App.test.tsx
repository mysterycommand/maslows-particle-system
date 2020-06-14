import { render } from '@testing-library/react';
import React from 'react';

import { App } from './App';

test('renders Bot', () => {
  const { getByText } = render(<App />);
  const botText = getByText(/Bot/i);
  expect(botText).toBeInTheDocument();
});
