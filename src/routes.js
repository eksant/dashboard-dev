import React from 'react'

const DashboardUser = React.lazy(() => import('./containers/UserLayout/DashboardUser'))

const routes = [{ title: 'Dashboard', path: '/', roles: ['Developer'], component: DashboardUser }]

export default routes
