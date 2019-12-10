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
    name: 'Dapps',
    path: '/dapps',
    icon: 'global',
    roles: ['Developer'],
  },
  {
    name: 'Manage DApps',
    path: '/manage-dapp',
    icon: 'global',
    roles: ['Superadmin', 'Developer'],
    childs: [
      { name: 'Domains Name', path: '/domains', icon: 'link', roles: ['Superadmin', 'Developer'] },
      { name: 'File Storages', path: '/storages', icon: 'cloud', roles: ['Superadmin', 'Developer'] },
    ],
  },
]

export default sides
