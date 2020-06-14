import clsx from 'clsx';
import React, { FC } from 'react';

import style from './App.module.css';

export const App: FC = () => (
  <div className={style.App}>
    <article className={style.Device}>
      <header className={style.Header}>Header</header>
      <section className={style.Section}>
        <ol className={style.Messages}>
          <li className={clsx(style.Message, style.Other)}>hello.</li>
          <li className={clsx(style.Message, style.Self)}>hello.</li>
        </ol>
      </section>
      <footer className={style.Footer}>
        <form action="" className={style.Form}>
          <input type="text" className={style.Input} />
          <button type="submit" className={style.Button}>
            ↑
          </button>
        </form>
      </footer>
    </article>
  </div>
);
