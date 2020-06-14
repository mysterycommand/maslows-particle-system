import React, { FC, useCallback, useReducer } from 'react';

import { AppAction, initialState, reducer, Sender } from '../../app';

import { Fireworks } from '../Fireworks';
import { Form } from '../Form';
import { Messages } from '../Messages';

import style from './App.module.css';
import { Sentiment } from '../Sentiment';

export const App: FC = () => {
  const [
    {
      messages,
      messagesTop,
      messagesHeight,
      isShowingFireworks,
      isShowingSentiment,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const wrappedDispatch = useCallback(
    (action: AppAction) => {
      dispatch(action);

      if (action.type !== 'addMessage') {
        return;
      }

      if (action.payload.content.indexOf('say ') === 0) {
        setTimeout(() => {
          wrappedDispatch({
            type: 'addMessage',
            payload: {
              sender: Sender.Other,
              content: action.payload.content.slice(3).trim(),
            },
          });
        }, 2_000);
      }

      if (action.payload.content === 'congrats') {
        dispatch({
          type: 'setIsShowingFireworks',
          payload: {
            isShowingFireworks: true,
          },
        });
      }

      if (action.payload.content === '❤️') {
        dispatch({
          type: 'setIsShowingSentiment',
          payload: {
            isShowingSentiment: true,
          },
        });
      }
    },
    [dispatch],
  );

  return (
    <article className={style.Device}>
      {isShowingFireworks && <Fireworks dispatch={dispatch} />}
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
      {isShowingSentiment && <Sentiment dispatch={dispatch} />}
    </article>
  );
};
