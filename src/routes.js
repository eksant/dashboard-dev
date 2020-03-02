import React from 'react'

const DashboardDev = React.lazy(() => import('./containers/DeveloperLayout/DashboardDev'))
const DappsDev = React.lazy(() => import('./containers/DeveloperLayout/DappsDev'))

const routes = [
  { title: 'Dashboard', path: '/', roles: ['Developer'], component: DashboardDev },
  { title: 'My DApps', page: 'list', path: '/dapps', roles: ['Developer'], component: DappsDev },
  { title: 'Create DApp', page: 'new', path: '/dapps/new', roles: ['Developer'], component: DappsDev },
  { title: 'Update DApp', page: 'edit', path: '/dapps/edit/:id', roles: ['Developer'], component: DappsDev },
  { title: 'Upload DApp', page: 'upload', path: '/dapps/upload', roles: ['Developer'], component: DappsDev },
]

export default routes
