import { Router } from '@reach/router';
import { withPrefix } from 'gatsby';
import React from 'react';

import ShowAdminMembers from '../../client-only-routes/admin/show-admin-members';
import RedirectHome from '../../components/redirect-home';

function AdminMembers(): JSX.Element {
  return (
    <Router>
      <ShowAdminMembers path={withPrefix('/admin/admin-members')} />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <RedirectHome default={true} />
    </Router>
  );
}

AdminMembers.displayName = 'AdminMembers';

export default AdminMembers;
