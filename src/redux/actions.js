import { setNewAuth, setAuth, postLogin, postForgot, postReset, postRegister, postLogout, getAuthUser } from './auth/actions'
import { setNewDapp, setDapp, getDapps, getDappById, createDapp, updateDapp, deleteDapp } from './dapps/actions'
import { setNewIpfs, setIpfs, getIpfsByHash } from './ipfs/actions'

export {
  setNewAuth,
  setAuth,
  postLogin,
  postForgot,
  postReset,
  postRegister,
  postLogout,
  getAuthUser,
  /** dapps */
  setNewDapp,
  setDapp,
  getDapps,
  getDappById,
  createDapp,
  updateDapp,
  deleteDapp,
  /** ipfs */
  setNewIpfs,
  setIpfs,
  getIpfsByHash,
}
