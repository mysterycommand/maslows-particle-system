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

let hearts: Heart[] = [];

const createHeart: (x: number, y: number) => Heart = (x, y) => {
  const theta = random() * ππ;
  const radius = random() * maxInitialSpeed;

  const px = x + cos(theta) * radius;
  const py = y + sin(theta) * radius;

  return {
    currPos: { x, y },
    prevPos: {
      x: px,
      y: py,
    },
    active: true,
    id: uuid(),
    opacity: 1,
    scale: 1,
  };
};

const updateHeart: (heart: Heart) => void = (h) => {
  const currVel = add(sub(h.currPos, h.prevPos), gravity);
  const nextPos = add(h.currPos, currVel);

  h.prevPos = h.currPos;
  h.currPos = nextPos;
};

const createHearts: (field: Field) => void = ({ width, height, time }) => {
  if (time % 80 < 16 && time < 5_000) {
    const emitX = random() * width;
    const emitY = height;

    hearts.push(createHeart(emitX, emitY));
  }
};

const updateHearts: (field: Field) => void = ({ height }) => {
  hearts.forEach((heart) => {
    updateHeart(heart);
    heart.opacity = heart.currPos.y / height;
    heart.scale = 2 - heart.currPos.y / height;
  });
};

const removeHearts: (field: Field) => void = ({ width, height, time }) => {
  hearts = hearts.reduce<Heart[]>((acc, heart) => {
    const {
      currPos: { x, y },
    } = heart;

    if (0 < x && x < width && -40 < y && y < height + 40) {
      acc.push(heart);
    }

    return acc;
  }, []);
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
      createHearts({ width, height, time });
      removeHearts({ width, height, time });
      setVisibleHearts(hearts);

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
