import React from 'react';
import { render } from '@testing-library/react';
import { Form } from './Form';

test('renders Form', () => {
  const { getByText } = render(<Form />);
  const text = getByText(/Form/i);
  expect(text).toBeInTheDocument();
});
