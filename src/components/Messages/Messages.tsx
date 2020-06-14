import React, { Dispatch, FC, ReactNode, useEffect, useRef } from 'react';

import { AppAction, MessageData, Sender } from '../../types';

import { Message } from '../Message';

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
  const messagesElRef = useRef<HTMLOListElement>(null);
  const sentinelElRef = useRef<HTMLLIElement>(null);

  const isNearBottom = useRef(true);

  const messagesTopRef = useRef(messagesTop);
  messagesTopRef.current = messagesTop;

  const messagesHeightRef = useRef(messagesHeight);
  messagesHeightRef.current = messagesHeight;

  useEffect(() => {
    if (!messagesElRef.current) {
      return;
    }

    const el = messagesElRef.current;
    const minScroll = el.clientHeight - 8;

    dispatch({
      type: 'setMessagesHeight',
      payload: {
        messagesHeight: el.clientHeight,
      },
    });

    const onScroll = () => {
      if (el.scrollTop < messagesTopRef.current && el.scrollTop < minScroll) {
        el.scrollTop = minScroll;
      }

      dispatch({
        type: 'setMessagesTop',
        payload: {
          messagesTop: el.scrollTop,
        },
      });

      const scrollBottom = el.scrollTop + el.clientHeight;
      const messagesBottom = messagesHeightRef.current - el.clientHeight / 3;
      isNearBottom.current = scrollBottom > messagesBottom;
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
    };
  }, [dispatch]);

  useEffect(() => {
    const isOwnMessage = messages[messages.length - 1]?.sender === Sender.Self;

    if (isNearBottom.current || isOwnMessage) {
      setImmediate(() => {
        if (!sentinelElRef.current) {
          return;
        }

        sentinelElRef.current.scrollIntoView({
          behavior: 'smooth',
        });
      });
    }
  }, [messages]);

  return (
    <ol className={style.Messages} ref={messagesElRef}>
      {messages.reduce<ReactNode[]>(
        (acc, { id, createdAt, sender, content, top, height }) => {
          if (!messagesElRef.current) {
            return acc;
          }

          const { clientHeight } = messagesElRef.current;
          const didMeasure = top !== undefined && height !== undefined;
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
        ref={sentinelElRef}
      ></li>
    </ol>
  );
};
