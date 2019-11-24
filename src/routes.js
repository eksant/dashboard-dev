import React from 'react'

const DashboardUser = React.lazy(() => import('./containers/UserLayout/DashboardUser'))
const DappsUser = React.lazy(() => import('./containers/UserLayout/DappsUser'))

const routes = [
  { title: 'Dashboard', path: '/', roles: ['Developer'], component: DashboardUser },
  { title: 'Domain List', page: 'list', path: '/manage-dapp/domains', roles: ['Developer'], component: DappsUser },
  { title: 'Create Domain', page: 'new', path: '/manage-dapp/domains/new', roles: ['Developer'], component: DappsUser },
  { title: 'Edit Domain', page: 'edit', path: '/manage-dapp/domains/edit', roles: ['Developer'], component: DappsUser },
]

export default routes
