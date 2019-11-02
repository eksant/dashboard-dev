const sides = [
  { name: 'Dashboard', path: '/', icon: 'dashboard', roles: ['User'] },
  {
    name: 'Manage Domain',
    path: '/manage-domain',
    icon: 'global',
    roles: ['User'],
    childs: [{ name: 'Name Services', path: '/name-services', icon: 'link', roles: ['User'] }],
  },
  {
    name: 'Storage',
    path: '/storage',
    icon: 'cloud-server',
    roles: ['User'],
    childs: [{ name: 'File Storages', path: '/categories', icon: 'cloud', roles: ['User'] }],
  },
]

export default sides
