import clsx from 'clsx';
import React, { FC, useEffect, useRef, Dispatch } from 'react';

import { MessageData, Sender, AppAction } from '../types';

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

    if (!(top && height)) {
      dispatch({
        type: 'renderMessage',
        payload: {
          id,
          top: messagesHeight + outerTop(messageRef.current),
          height: outerHeight(messageRef.current),
        },
      });
    } else {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
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
