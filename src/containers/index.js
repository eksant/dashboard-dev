import React from 'react'

const LoginLayout = React.lazy(() => import('./AuthLayout/LoginLayout'))
const RegisterLayout = React.lazy(() => import('./AuthLayout/RegisterLayout'))
const DefaultLayout = React.lazy(() => import('./DefaultLayout'))

export { LoginLayout, RegisterLayout, DefaultLayout }
