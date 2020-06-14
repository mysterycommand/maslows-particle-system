import { render } from '@testing-library/react';
import React from 'react';

import { Sender } from '../../types';

import { Messages } from './Messages';

test('renders Messages', () => {
  const { container } = render(
    <Messages
      messages={[
        {
          id: 'uuid',
          createdAt: new Date().toISOString(),
          sender: Sender.Self,
          content: 'Messages',
        },
      ]}
      messagesTop={0}
      messagesHeight={665}
      dispatch={() => {}}
    />,
  );
  const ol = container.querySelector('ol');
  expect(ol).toBeInTheDocument();
});
