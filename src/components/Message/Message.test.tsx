import { render } from '@testing-library/react';
import React from 'react';

import { Sender } from '../types';

import { Message } from './Message';

window.HTMLElement.prototype.scrollIntoView = () => {};

test('renders Message', () => {
  const { getByText } = render(
    <Message
      createdAt={new Date().toISOString()}
      sender={Sender.Self}
      content={'Message'}
    />,
  );
  const text = getByText(/Message/i);
  expect(text).toBeInTheDocument();
});
