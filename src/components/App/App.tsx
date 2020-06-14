import React, { FC } from 'react';

import style from './App.module.css';

export const App: FC = () => (
  <div className={style.App}>
    <article className={style.Device}>
      <header className={style.Header}>Header</header>
      <section className={style.Section}>
        <ol className={style.Messages}>
          <li className={style.Message}>hello.</li>
        </ol>
      </section>
      <footer className={style.Footer}>Footer</footer>
    </article>
  </div>
);
