import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { IntlProvider } from 'react-intl';

import messages from './messages.json';
import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';

function requestHandler(request, response) {
  const locale = request.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';
  const context = createServerRenderContext();

  let html = renderToString(
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ServerRouter location={request.url} context={context}>
        <Pages />
      </ServerRouter>
    </IntlProvider>,
  );

  response.setHeader('Content-Type', 'text/html');

  const result = context.getResult();

  if (result.redirect) {
    response.writeHead(301, {
      Location: result.redirect.pathname,
    });
  }

  if (result.missed) {
    response.writeHead(404);

    html = renderToString(
      <IntlProvider locale={locale} messages={messages[locale]}>
        <ServerRouter location={request.url} context={context}>
          <Pages />
        </ServerRouter>
      </IntlProvider>,
    );
  }

  response.write(
    renderToStaticMarkup(
      <Layout title="Aplicación" content={html} />,
    ),
  );
  response.end();
}

const server = http.createServer(requestHandler);

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
