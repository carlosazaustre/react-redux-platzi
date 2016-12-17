import React from 'react';
import {
  Match,
  Miss,
} from 'react-router';

import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Error404 from './Error404';
import styles from './Page.css';

function Pages() {
  return (
    <main role="application" className={styles.section}>
      <Match exactly pattern="/" component={Home} />
      <Match exactly pattern="/post/:id" component={Post} />
      <Match exactly pattern="/user/:id" component={Profile} />
      <Miss component={Error404} />
    </main>
  );
}

export default Pages;
