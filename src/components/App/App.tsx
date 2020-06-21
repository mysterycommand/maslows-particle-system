import React, { FC, useCallback, useEffect, useReducer } from 'react';

import { AppAction, initialState, reducer, Sender } from '../../app';
import { beeMovie } from '../../data';

import { Fireworks } from '../Fireworks';
import { Form } from '../Form';
import { Messages } from '../Messages';
import { Sentiment } from '../Sentiment';

import style from './App.module.css';

const helpMessage = `\
I'm a kind of a chat bot, here are some things that I can do:

- type 'echo' and I'll start repeating your messages (type 'echo' again to \
turn this off)
- type 'say <% message %>' and I'll say our message back to you
- type 'congrats' to see a celebratory fireworks display
- type '❤️' to feel some love
- type 'bee movie' and I'll recite the script of the 2007 cult favorite (type \
'bee movie' again to stop me, but don't worry if you type it a third time I'll \
pick right back up where I left off!)
- type 'help' to see this message

I hope you're having a great day!`;

let isBeeMoviePlaying = false;
let currentLine = 0;

let isEchoing = false;

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

      if (action.payload.content === 'echo') {
        isEchoing = !isEchoing;
      }

      if (isEchoing) {
        setTimeout(() => {
          dispatch({
            type: 'addMessage',
            payload: {
              sender: Sender.Other,
              content: action.payload.content,
            },
          });
        }, 1_000);
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
