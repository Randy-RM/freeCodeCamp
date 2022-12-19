import { Router } from '@reach/router';
import { withPrefix } from 'gatsby';
import React from 'react';

import ShowPresentation from '../client-only-routes/show-presentation';
import RedirectHome from '../components/redirect-home';

function Presentation(): JSX.Element {
  return (
    <Router>
      <ShowPresentation path={withPrefix('/presentation')} />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <RedirectHome default={true} />
    </Router>
  );
}

Presentation.displayName = 'Presentation';

export default Presentation;
