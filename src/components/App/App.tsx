import React, { FC, useCallback, useReducer, useEffect } from 'react';

import { AppAction, initialState, reducer, Sender } from '../../app';

import { Fireworks } from '../Fireworks';
import { Form } from '../Form';
import { Messages } from '../Messages';
import { Sentiment } from '../Sentiment';

import style from './App.module.css';
import { beeMovie } from '../../data';

let isBeeMoviePlaying = false;
let currentLine = 0;

const helpMessage = `\
I'm a kind of a chat bot, here are some things that I can do:

- type 'echo' and I'll start repeating your messages
- type 'say <% message %>' and I'll say our message back to you
- type 'congrats' to see a celebratory fireworks display
- type '❤️' to feel some love
- type 'bee movie' and I'll recite the script of the 2007 cult favorite
- type 'help' to see this message

I hope you're having a great day!`;

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

      if (action.payload.content === 'help') {
        setTimeout(() => {
          dispatch({
            type: 'addMessage',
            payload: {
              sender: Sender.Other,
              content: helpMessage,
            },
          });
        }, 500);
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

      if (action.payload.content === 'bee movie') {
        isBeeMoviePlaying = !isBeeMoviePlaying;

        const sendLine = () => {
          if (!isBeeMoviePlaying) {
            return;
          }

          currentLine++;
          currentLine %= beeMovie.length;

          setTimeout(() => {
            dispatch({
              type: 'addMessage',
              payload: {
                sender: Sender.Other,
                content: beeMovie[currentLine],
              },
            });

            sendLine();
          }, 2_000);
        };

        sendLine();
      }
    },
    [dispatch],
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: 'addMessage',
        payload: {
          sender: Sender.Other,
          content: 'Hello!',
        },
      });
    }, 500);

    setTimeout(() => {
      dispatch({
        type: 'addMessage',
        payload: {
          sender: Sender.Other,
          content: helpMessage,
        },
      });
    }, 1_000);
  }, []);

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
