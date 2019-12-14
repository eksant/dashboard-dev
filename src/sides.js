const sides = [
  { name: 'Dashboard', path: '/', icon: 'dashboard', roles: ['Superadmin', 'Developer'] },
  {
    name: 'Manage User',
    path: '/manage-user',
    icon: 'global',
    roles: ['Superadmin'],
    childs: [{ name: 'User', path: '/users', icon: 'link', roles: ['Superadmin'] }],
  },
  {
    name: 'DApps',
    path: '/dapps',
    icon: 'global',
    roles: ['Developer'],
  },
]

export default sides
