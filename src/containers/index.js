import React from 'react'

const LoginLayout = React.lazy(() => import('./AuthLayout/LoginLayout'))
const ForgotLayout = React.lazy(() => import('./AuthLayout/ForgotLayout'))
const RegisterLayout = React.lazy(() => import('./AuthLayout/RegisterLayout'))
const DefaultLayout = React.lazy(() => import('./DefaultLayout'))

export { LoginLayout, ForgotLayout, RegisterLayout, DefaultLayout }
