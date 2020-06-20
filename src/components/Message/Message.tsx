import clsx from 'clsx';
import React, {
  Children,
  cloneElement,
  Dispatch,
  FC,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { v4 as uuid } from 'uuid';

import { AppAction, MessageData, Sender } from '../../app';

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

const getKey: (text: string, index: number) => string = (text, index) =>
  `${index}-${JSON.stringify(text).replace(/\W/g, '').split(' ').join('-')}`;

const renderMessage: (lines: string[]) => ReactNode = (lines) =>
  lines.reduce<ReactNode[]>((acc, line, i) => {
    if (line.startsWith('- ')) {
      const l = line.slice(2).trim();
      const li = (
        <li key={getKey(l, i)} className={style.Line}>
          {l || <>&nbsp;</>}
        </li>
      );

      const uList = acc[acc.length - 1];
      isValidElement(uList) && uList.type === 'ul'
        ? (acc[acc.length - 1] = cloneElement(
            uList,
            [],
            [...Children.toArray(uList.props.children), li],
          ))
        : acc.push(
            <ul key={uuid()} className={style.List}>
              {li}
            </ul>,
          );
    } else {
      acc.push(
        <p key={getKey(line, i)} className={style.Line}>
          {line || <>&nbsp;</>}
        </p>,
      );
    }

    return acc;
  }, []);

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
  const messageElRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!messageElRef.current) {
      return;
    }

    if (top === undefined && height === undefined) {
      dispatch({
        type: 'renderMessage',
        payload: {
          id,
          top: messagesHeight + outerTop(messageElRef.current),
          height: outerHeight(messageElRef.current),
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
      ref={messageElRef}
    >
      {renderMessage(content.split('\n'))}
    </li>
  );
};
