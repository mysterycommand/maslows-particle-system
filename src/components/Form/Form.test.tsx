import { render } from '@testing-library/react';
import React from 'react';

import { Form } from './Form';

test('renders Form', () => {
  const { getByText } = render(<Form dispatch={() => {}} />);
  const text = getByText(/↑/i);
  expect(text).toBeInTheDocument();
});
