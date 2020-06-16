import React, { FC, useRef, useEffect, Dispatch, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AppAction } from '../../app';
import {
  add,
  sub,
  raf,
  caf,
  Field,
  Particle,
  Vec2,
  random,
  ππ,
  cos,
  sin,
  pool,
} from '../../lib';

import style from './Sentiment.module.css';

interface Props {
  dispatch: Dispatch<AppAction>;
}

interface Heart extends Particle {
  id: string;
  opacity: number;
  scale: number;
}

const maxInitialSpeed = 5;
const gravity: Vec2 = { x: 0, y: -0.1 };

const hearts = pool<Heart>(100, () => ({
  id: uuid(),
  opacity: 1,
  scale: 1,
}));

const activateHeart: (heart: Heart, x: number, y: number) => void = (
  heart,
  x,
  y,
) => {
  const theta = random() * ππ;
  const radius = random() * maxInitialSpeed;

  const px = x + cos(theta) * radius;
  const py = y + sin(theta) * radius;

  heart.currPos = { x, y };
  heart.prevPos = { x: px, y: py };
  heart.active = true;
  heart.opacity = 1;
  heart.scale = 1;
};

const updateHeart: (heart: Heart) => void = (h) => {
  const currVel = add(sub(h.currPos, h.prevPos), gravity);
  const nextPos = add(h.currPos, currVel);

  h.prevPos = h.currPos;
  h.currPos = nextPos;
};

const activateHearts: (field: Field) => void = ({ width, height, time }) => {
  if (time % 80 < 16 && time < 5_000) {
    const emitX = random() * width;
    const emitY = height;

    const inactive = hearts.find(({ active }) => !active);
    if (inactive) {
      activateHeart(inactive, emitX, emitY);
    }
  }
};

const updateHearts: (field: Field) => void = ({ height }) => {
  hearts.forEach((heart) => {
    updateHeart(heart);
    heart.opacity = heart.currPos.y / height;
    heart.scale = 2 - heart.currPos.y / height;
  });
};

const deactivateHearts: (field: Field) => void = ({ width, height }) => {
  hearts.forEach((heart) => {
    const {
      currPos: { x, y },
    } = heart;

    heart.active = 0 < x && x < width && -40 < y && y < height + 40;
  });
};

export const Sentiment: FC<Props> = ({ dispatch }) => {
  const sentimentElRef = useRef<HTMLDivElement>(null);
  const [visibleHearts, setVisibleHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (!sentimentElRef.current) {
      return;
    }

    sentimentElRef.current.style.opacity = '1';
    const { clientWidth: width, clientHeight: height } = sentimentElRef.current;

    let frameId: number;
    let firstTime = 0;
    let time = 0;

    const onFrame: FrameRequestCallback = (timeStamp: DOMHighResTimeStamp) => {
      frameId = raf(onFrame);

      firstTime || (firstTime = timeStamp);
      time = timeStamp - firstTime;

      updateHearts({ width, height, time });
      activateHearts({ width, height, time });
      deactivateHearts({ width, height, time });
      setVisibleHearts(hearts.filter(({ active }) => active));

      if (time > 5_000 && hearts.length === 0 && sentimentElRef.current) {
        sentimentElRef.current.style.opacity = '0';
        caf(frameId);

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
      }
    };

    frameId = raf(onFrame);
    return () => {
      caf(frameId);
    };
  }, [dispatch]);

  return (
    <div className={style.Sentiment} ref={sentimentElRef}>
      {visibleHearts.map(({ id, currPos: { x, y }, opacity, scale }) => (
        <span
          role="img"
          aria-label="love"
          className={style.Heart}
          key={id}
          style={{
            opacity,
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};
