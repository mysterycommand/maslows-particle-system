import clsx from 'clsx';
import React, { Dispatch, FC, useEffect, useRef } from 'react';

import { AppAction, MessageData, Sender } from '../types';

import style from './Message.module.css';

interface Props extends MessageData {
  messagesHeight: number;
  dispatch: Dispatch<AppAction>;
}

const { getComputedStyle: getStyle } = window;

const outerTop: (el: HTMLElement) => number = (el) => {
  const { marginTop } = getStyle(el);
  return el.offsetTop - parseInt(marginTop, 10);
};

const outerHeight: (el: HTMLElement) => number = (el) => {
  const { marginTop, height, marginBottom } = getStyle(el);
  return [marginTop, height, marginBottom].reduce(
    (acc, px) => acc + parseInt(px, 10),
    0,
  );
};

export const Message: FC<Props> = ({
  id,
  createdAt,
  sender,
  content,
  top,
  height,
  messagesHeight,
  dispatch,
}) => {
  const messageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!messageRef.current) {
      return;
    }

    if (top === undefined && height === undefined) {
      dispatch({
        type: 'renderMessage',
        payload: {
          id,
          top: messagesHeight + outerTop(messageRef.current),
          height: outerHeight(messageRef.current),
        },
      });
    }
  }, [dispatch, height, id, messagesHeight, top]);

  return (
    <li
      className={clsx({
        [style.Message]: true,
        [style.Self]: sender === Sender.Self,
        [style.Other]: sender === Sender.Other,
      })}
      title={createdAt}
      style={{
        top,
      }}
      ref={messageRef}
    >
      {content}
    </li>
  );
};
