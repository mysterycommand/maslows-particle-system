import { render } from '@testing-library/react';
import React from 'react';

import { Sentiment } from './Sentiment';

test('renders Sentiment', () => {
  const { container } = render(<Sentiment dispatch={() => {}} />);
  const div = container.querySelector('div');
  expect(div).toBeInTheDocument();
});
