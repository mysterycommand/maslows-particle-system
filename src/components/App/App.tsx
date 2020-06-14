import clsx from 'clsx';
import React, { FC, Reducer, useReducer, useState } from 'react';
import { v4 as uuid } from 'uuid';

import style from './App.module.css';

enum Sender {
  Self = 'Self',
  Other = 'Other',
}

interface Message {
  id: string;
  createdAt: string;
  sender: Sender;
  content: string;
}

interface AppState {
  messages: Message[];
}

interface AddMessageAction {
  type: 'addMessage';
  payload: {
    sender: Sender;
    content: string;
  };
}

type AppAction = AddMessageAction;

const reducer: Reducer<AppState, AppAction> = (state, action) => ({
  messages: [
    ...state.messages,
    {
      id: uuid(),
      createdAt: new Date().toISOString(),
      ...action.payload,
    },
  ],
});

export const App: FC = () => {
  const [{ messages }, dispatch] = useReducer(reducer, { messages: [] });
  const [message, setMessage] = useState('');

  return (
    <div className={style.App}>
      <article className={style.Device}>
        <header className={style.Header}>Echo</header>
        <section className={style.Section}>
          <ol className={style.Messages}>
            {messages.map(({ id, createdAt, sender, content }) => (
              <li
                key={id}
                className={clsx({
                  [style.Message]: true,
                  [style.Self]: sender === Sender.Self,
                  [style.Other]: sender === Sender.Other,
                })}
                title={createdAt}
              >
                {content}
              </li>
            ))}
          </ol>
        </section>
        <footer className={style.Footer}>
          <form
            action=""
            className={style.Form}
            onSubmit={(event) => {
              event.preventDefault();

              dispatch({
                type: 'addMessage',
                payload: {
                  sender: Sender.Self,
                  content: message,
                },
              });

              setTimeout(() => {
                dispatch({
                  type: 'addMessage',
                  payload: {
                    sender: Sender.Other,
                    content: message,
                  },
                });
              }, 2_000);

              setMessage('');
            }}
          >
            <input
              type="text"
              className={style.Input}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
            <button
              type="submit"
              className={style.Button}
              disabled={message === ''}
            >
              ↑
            </button>
          </form>
        </footer>
      </article>
    </div>
  );
};
