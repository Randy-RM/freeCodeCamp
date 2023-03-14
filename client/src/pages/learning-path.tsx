import { Router } from '@reach/router';
import { withPrefix } from 'gatsby';
import React from 'react';

import ShowLearningPath from '../client-only-routes/show-learning-path';
import RedirectHome from '../components/redirect-home';

function Learningpath(): JSX.Element {
  return (
    <Router>
      <ShowLearningPath
        path={withPrefix('/learning-path/:category/:categoryId')}
      />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <RedirectHome default={true} />
    </Router>
  );
}

Learningpath.displayName = 'Learningpath';

export default Learningpath;
