import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

function Error404() {
  return (
    <section name="error404">
      <h1>Error 404</h1>
      <Link to="/">
        <FormattedMessage id="error.404" />
      </Link>
    </section>
  );
}

export default Error404;
