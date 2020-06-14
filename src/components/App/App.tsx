import React, { FC, useReducer, useCallback } from 'react';

import { initialState, reducer } from '../../app';

import { Fireworks } from '../Fireworks';
import { Form } from '../Form';
import { Messages } from '../Messages';

import style from './App.module.css';
import { AppAction, Sender } from '../../types';

export const App: FC = () => {
  const [{ messages, messagesTop, messagesHeight }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const wrappedDispatch = useCallback(
    (action: AppAction) => {
      dispatch(action);

      if (
        action.type === 'addMessage' &&
        action.payload.content.indexOf('say ') === 0
      ) {
        setTimeout(() => {
          dispatch({
            type: 'addMessage',
            payload: {
              sender: Sender.Other,
              content: action.payload.content.slice(3).trim(),
            },
          });
        }, 2_000);
      }
    },
    [dispatch],
  );

  return (
    <article className={style.Device}>
      <Fireworks />
      <header className={style.Header}>Bot</header>
      <Messages
        messages={messages}
        messagesTop={messagesTop}
        messagesHeight={messagesHeight}
        dispatch={dispatch}
      />
      <footer className={style.Footer}>
        <Form dispatch={wrappedDispatch} />
      </footer>
    </article>
  );
};
