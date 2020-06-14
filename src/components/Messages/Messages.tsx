import React, { Dispatch, FC, ReactNode, useEffect, useRef } from 'react';

import { Message } from '../Message';
import { AppAction, MessageData } from '../types';

import style from './Messages.module.css';

interface Props {
  messages: MessageData[];
  messagesTop: number;
  messagesHeight: number;
  dispatch: Dispatch<AppAction>;
}

export const Messages: FC<Props> = ({
  messages,
  messagesTop,
  messagesHeight,
  dispatch,
}) => {
  const messagesRef = useRef<HTMLOListElement>(null);
  const sentinelRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!messagesRef.current) {
      return;
    }

    const el = messagesRef.current;

    dispatch({
      type: 'setMessagesHeight',
      payload: {
        messagesHeight: el.clientHeight,
      },
    });

    const onScroll = () =>
      dispatch({
        type: 'setMessagesTop',
        payload: {
          messagesTop: el.scrollTop,
        },
      });

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
    };
  }, [dispatch]);

  useEffect(() => {
    setImmediate(() => {
      if (!sentinelRef.current) {
        return;
      }

      sentinelRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    });
  }, [messages, messagesHeight, messagesTop]);

  return (
    <ol className={style.Messages} ref={messagesRef}>
      {messages.reduce<ReactNode[]>(
        (acc, { id, createdAt, sender, content, top, height }) => {
          if (!messagesRef.current) {
            return acc;
          }

          const { clientHeight } = messagesRef.current;
          const didMeasure = top && height;
          const isInBounds =
            top &&
            height &&
            top < messagesTop + clientHeight &&
            top + height > messagesTop;

          if (!didMeasure || isInBounds) {
            acc.push(
              <Message
                key={id}
                id={id}
                createdAt={createdAt}
                sender={sender}
                content={content}
                top={top}
                height={height}
                messagesHeight={messagesHeight}
                dispatch={dispatch}
              />,
            );
          }

          return acc;
        },
        [],
      )}
      <li
        className={style.Sentinel}
        style={{ top: messagesHeight }}
        ref={sentinelRef}
      ></li>
    </ol>
  );
};
