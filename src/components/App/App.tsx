import React, { FC, Reducer, useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import { Form } from '../Form';
import { Message } from '../Message';
import { AppAction, AppState } from '../types';

import style from './App.module.css';

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

  return (
    <div className={style.App}>
      <article className={style.Device}>
        <header className={style.Header}>Echo</header>
        <section className={style.Section}>
          <ol className={style.Messages}>
            {messages.map(({ id, createdAt, sender, content }) => (
              <Message
                key={id}
                createdAt={createdAt}
                sender={sender}
                content={content}
              />
            ))}
          </ol>
        </section>
        <footer className={style.Footer}>
          <Form dispatch={dispatch} />
        </footer>
      </article>
    </div>
  );
};
