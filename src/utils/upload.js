import config from '../config'

const upload = () => ({
  name: 'file',
  action: `${config.api.dapps}/ipfs/add`,
})

export default upload
