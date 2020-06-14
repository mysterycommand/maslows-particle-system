import React, {
  FC,
  ReactNode,
  Reducer,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import { Form } from '../Form';
import { Message } from '../Message';
import { AppAction, AppState } from '../types';

import style from './App.module.css';

const reducer: Reducer<AppState, AppAction> = (state, action) => {
  switch (action.type) {
    case 'initMessages':
      return {
        messages: state.messages,
        messagesHeight: action.payload.messagesHeight,
      };
    case 'addMessage':
      return {
        messages: [
          ...state.messages,
          {
            id: uuid(),
            createdAt: new Date().toISOString(),
            ...action.payload,
          },
        ],
        messagesHeight: state.messagesHeight,
      };
    case 'renderMessage':
      const message = state.messages.find((m) => m.id === action.payload.id);
      const index = message ? state.messages.indexOf(message) : -1;

      return message && index !== -1
        ? {
            messages: [
              ...state.messages.slice(0, index),
              {
                ...message,
                top: action.payload.top,
                height: action.payload.height,
              },
              ...state.messages.slice(index + 1),
            ],
            messagesHeight: state.messagesHeight + action.payload.height,
          }
        : state;
    default:
      return state;
  }
};

export const App: FC = () => {
  const [{ messages, messagesHeight }, dispatch] = useReducer(reducer, {
    messages: [],
    messagesHeight: 0,
  });

  const messagesRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!messagesRef.current) {
      return;
    }

    dispatch({
      type: 'initMessages',
      payload: {
        messagesHeight: messagesRef.current.clientHeight,
      },
    });
  }, []);

  const [messagesTop, setMessagesTop] = useState(0);

  useEffect(() => {
    if (!messagesRef.current) {
      return;
    }

    const el = messagesRef.current;
    const onScroll = () => setMessagesTop(el.scrollTop);
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className={style.App}>
      <article className={style.Device}>
        <header className={style.Header}>Echo</header>
        <ol className={style.Messages} ref={messagesRef}>
          {messages.reduce<ReactNode[]>(
            (acc, { id, createdAt, sender, content, top, height }) => {
              if (!messagesRef.current) {
                return acc;
              }

              const { clientHeight } = messagesRef.current;

              if (
                !(top && height) ||
                (top &&
                  height &&
                  top < messagesTop + clientHeight &&
                  top + height > messagesTop)
              ) {
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
          <li className={style.Sentinel} style={{ top: messagesHeight }}></li>
        </ol>
        <footer className={style.Footer}>
          <Form dispatch={dispatch} />
        </footer>
      </article>
    </div>
  );
};
