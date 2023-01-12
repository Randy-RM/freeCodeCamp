import { Router } from '@reach/router';
import { withPrefix } from 'gatsby';
import React from 'react';

import ShowAwsCourse from '../../client-only-routes/show-aws-course';
import RedirectHome from '../../components/redirect-home';

function Course(): JSX.Element {
  return (
    <Router>
      <ShowAwsCourse path={withPrefix('/aws-courses/course/:course')} />
      {/* <ShowAwsCourse path={withPrefix('/aws-courses/course/:courseId')} /> */}
      {/* <ShowAwsCourse path={withPrefix('/aws-courses/course')} /> */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <RedirectHome default={true} />
    </Router>
  );
}

Course.displayName = 'Course';

export default Course;
