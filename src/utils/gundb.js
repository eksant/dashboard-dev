import Gun from 'gun/gun'
import config from '../config'
import 'gun/sea'
import 'gun/lib/webrtc'
import 'gun/lib/path'

const gun = Gun(config.gundb.peers)
const sea = Gun.SEA
const textRandom = val => {
  return Gun.text.random(val)
}

export { gun, sea, textRandom }
