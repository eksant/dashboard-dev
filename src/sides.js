const sides = [
  { name: 'Dashboard', path: '/', icon: 'dashboard', roles: ['User'] },
  {
    name: 'Manage dApp',
    path: '/manage-dapp',
    icon: 'global',
    roles: ['User'],
    childs: [{ name: 'Domain Name', path: '/domain', icon: 'link', roles: ['User'] }],
  },
  {
    name: 'Manage Storage',
    path: '/storage',
    icon: 'cloud-server',
    roles: ['User'],
    childs: [{ name: 'File Storages', path: '/deploy', icon: 'cloud', roles: ['User'] }],
  },
]

export default sides
