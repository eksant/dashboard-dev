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
    name: 'Manage dApp',
    path: '/manage-dapp',
    icon: 'global',
    roles: ['Developer'],
    childs: [{ name: 'Domains Name', path: '/domains', icon: 'link', roles: ['Developer'] }],
  },
  {
    name: 'Manage Storage',
    path: '/manage-storage',
    icon: 'cloud-server',
    roles: ['Developer'],
    childs: [{ name: 'File Storages', path: '/storages', icon: 'cloud', roles: ['Developer'] }],
  },
]

export default sides
