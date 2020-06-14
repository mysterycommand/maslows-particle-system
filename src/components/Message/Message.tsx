import clsx from 'clsx';
import React, { FC, useEffect, useRef } from 'react';

import { MessageData, Sender } from '../types';

import style from './Message.module.css';

interface Props extends Pick<MessageData, 'createdAt' | 'sender' | 'content'> {}

export const Message: FC<Props> = ({ createdAt, sender, content }) => {
  const messageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!messageRef.current) {
      return;
    }

    messageRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, []);

  return (
    <li
      className={clsx({
        [style.Message]: true,
        [style.Self]: sender === Sender.Self,
        [style.Other]: sender === Sender.Other,
      })}
      title={createdAt}
      ref={messageRef}
    >
      {content}
    </li>
  );
};
