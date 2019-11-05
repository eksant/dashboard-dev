import Gun from 'gun'
import config from '../config'
require('gun/sea')

const gun = Gun({ file: config.db.fileName, peers: config.db.peers })

export default gun
