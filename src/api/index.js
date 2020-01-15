import { Post, Get, Patch, Put, Delete, ax } from './axios'

const API = {
  getMusicUrl: function (obj) {
    return Get("?key=523077333&cache=0&type=song", obj)
  },
  getMusicLyric(obj) {
    return Get(`?key=523077333&cache=0&type=lrc`, obj)
  },
  queryMusic(obj) {
    return Get(`?key=523077333&cache=0&type=lrc`, obj)
  }
}
export default API