import { render } from '@testing-library/react';
import React from 'react';

import { Sentiment } from './Sentiment';

test('renders Sentiment', () => {
  const { getByText } = render(<Sentiment />);
  const text = getByText(/Sentiment/i);
  expect(text).toBeInTheDocument();
});
