import React, { FC, useRef, useEffect, Dispatch } from 'react';

import style from './Sentiment.module.css';
import { AppAction } from '../../app';

interface Props {
  dispatch: Dispatch<AppAction>;
}

const { setTimeout } = window;

export const Sentiment: FC<Props> = ({ dispatch }) => {
  const sentimentElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentimentElRef.current) {
      return;
    }

    sentimentElRef.current.style.opacity = '1';

    setTimeout(() => {
      if (!sentimentElRef.current) {
        return;
      }

      sentimentElRef.current.style.opacity = '0';

      setTimeout(
        () =>
          dispatch({
            type: 'setIsShowingSentiment',
            payload: {
              isShowingSentiment: false,
            },
          }),
        400,
      );
    }, 5_000);
  }, [dispatch]);

  return <div className={style.Sentiment} ref={sentimentElRef}></div>;
};
