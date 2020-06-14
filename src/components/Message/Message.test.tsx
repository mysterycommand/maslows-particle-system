import { render } from '@testing-library/react';
import React from 'react';

import { Sender } from '../types';

import { Message } from './Message';

window.HTMLElement.prototype.scrollIntoView = () => {};

test('renders Message', () => {
  const { getByText } = render(
    <Message
      id={'uuid'}
      createdAt={new Date().toISOString()}
      sender={Sender.Self}
      content="Message"
      top={undefined}
      height={undefined}
      messagesHeight={665}
      dispatch={() => {}}
    />,
  );
  const text = getByText(/Message/i);
  expect(text).toBeInTheDocument();
});
