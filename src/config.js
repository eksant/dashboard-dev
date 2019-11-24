const hostApi = 'http://18.136.211.116'
export default {
  app: {
    pageLimit: 20,
    defaultLang: 'en',
    storeKey: 'pfalfa',
    secretKey: '#PFALFAin2019#',
  },
  db: {
    peers: ['http://18.136.211.116:8765/gun']
  },
  api: {
    //http://18.136.211.116
    ihub: `${hostApi}:3003/api`,
    pfalfa: `${hostApi}:3033/api`,
    dapps: `${hostApi}:8081`,
  },
}
