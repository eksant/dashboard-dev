import CryptoJS from 'crypto-js';
import config from '../config';

const keySize = 256;
const iterations = 100;
const secretKey = config.secretKey;

export function randomPassword(length = 8) {
  var chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
  var pass = '';

  for (var x = 0; x < length; x++) {
    var i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
  }

  return pass;
}

export function hmacEncrypt(message) {
  const encrypted = CryptoJS.HmacSHA256(message, secretKey);
  return encrypted.toString(CryptoJS.enc.Base64);
}

export function encrypt(payload) {
  if (!payload) {
    return null;
  }

  if (isObject(payload)) {
    payload = JSON.stringify(payload);
  }
console.log('==secretKey', secretKey);

  console.log('==payload', payload);

  let salt = CryptoJS.lib.WordArray.random(128 / 8);
  console.log('==salt', salt);
  
  let iv = CryptoJS.lib.WordArray.random(128 / 8);
  console.log('==eiv', iv);
  
  let key = CryptoJS.PBKDF2(secretKey, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });
  console.log('==key', key);

  let encrypted = CryptoJS.AES.encrypt(payload, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return salt.toString() + iv.toString() + encrypted.toString();
}

export function decrypt(payload) {
  if (!payload) {
    return null;
  }

  let salt = CryptoJS.enc.Hex.parse(payload.substr(0, 32));
  let iv = CryptoJS.enc.Hex.parse(payload.substr(32, 32));
  let encrypted = payload.substring(64);
  let key = CryptoJS.PBKDF2(secretKey, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });
  let result = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  }).toString(CryptoJS.enc.Utf8);

  return result ? (isObject(result) ? JSON.parse(result) : result) : null;
}

export function isList(val) {
  return val != null && typeof val != 'function' && typeof val.length == 'number';
}

export function isFunction(val) {
  return val && {}.toString.call(val) === '[object Function]';
}

export function isObject(val) {
  return val && {}.toString.call(val) === '[object Object]';
}

export function isArray(val) {
  return Array.isArray(val);
}

export function basePath(str) {
  var n = str.lastIndexOf('/');
  return str.substr(0, n);
}

export function pathName() {
  return window.location.pathname;
}

export function pathNames(val) {
  const path = val ? val : pathName();
  return path
    .split('/')
    .filter(f => f !== '')
    .map(m => `/${m}`);
}

export function parseObject(val) {
  if (!val) {
    return null;
  }

  return JSON.parse(val);
}

export function dashSpace(str) {
  str = str.replace(/\s/g, '-');
  return uCase(str);
}

export function uCase(str) {
  return str.replace(/\w\S*/g, txt => {
    const exceptTxt = txt === 'DKI' || txt === 'DI' ? txt : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    return exceptTxt;
  });
}
