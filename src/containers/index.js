import React from 'react'

const DefaultLayout = React.lazy(() => import('./DefaultLayout'))
const LoginLayout = React.lazy(() => import('./AuthLayout/LoginLayout'))
const ForgotLayout = React.lazy(() => import('./AuthLayout/ForgotLayout'))
const RegisterLayout = React.lazy(() => import('./AuthLayout/RegisterLayout'))

export { LoginLayout, ForgotLayout, RegisterLayout, DefaultLayout }
