import React, { Dispatch, FC, useState } from 'react';

import { AppAction, Sender } from '../../app';

import style from './Form.module.css';

interface Props {
  dispatch: Dispatch<AppAction>;
}

export const Form: FC<Props> = ({ dispatch }) => {
  const [message, setMessage] = useState('');

  return (
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
      <button type="submit" className={style.Button} disabled={message === ''}>
        ↑
      </button>
    </form>
  );
};
