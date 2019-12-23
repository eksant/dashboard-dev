import React from 'react'

const DashboardDev = React.lazy(() => import('./containers/DeveloperLayout/DashboardDev'))
const DappsDev = React.lazy(() => import('./containers/DeveloperLayout/DappsDev'))

const routes = [
  { title: 'Dashboard', path: '/', roles: ['Developer'], component: DashboardDev },
  { title: 'DApps List', page: 'list', path: '/dapps', roles: ['Developer'], component: DappsDev },
  { title: 'Submit DApp', page: 'new', path: '/dapps/new', roles: ['Developer'], component: DappsDev },
  { title: 'Upload DApp', page: 'upload', path: '/dapps/upload', roles: ['Developer'], component: DappsDev },
]

export default routes
