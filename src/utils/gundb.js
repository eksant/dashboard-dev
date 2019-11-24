import Gun from 'gun/gun'
import 'gun/sea'
import 'gun/lib/webrtc'
import 'gun/lib/path'
import config from '../config'

const gun = Gun({ peers: config.db.peers })
const sea = Gun.SEA
const textRandom = val => {
  return Gun.text.random(val)
}

export { gun, sea, textRandom }
