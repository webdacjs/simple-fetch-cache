const cacheMap = new Map()
const defaultTTL = -1
const cleanupMsec = 3600000 // 1h default cleanup

// CleanUp function.
setInterval(() => {
  const nowts = Date.now()
  cacheMap.forEach((value, key) => {
    if (value.ttl !== -1 && (nowts - value.ts) > value.ttl) {
      cacheMap.delete(key)
    }
  })
}, cleanupMsec)

const getHashCode = str => {
  for (var i = 0, h = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0
  }
  return h
}

const checkTTlVal = (entry, k) => {
  if (!entry) return
  if (entry.ttl === -1 || (Date.now() - entry.ts) < entry.ttl) {
    return entry.val
  } else {
    del(k)
  }
}

const getTTL = ttl => ttl ? ttl : defaultTTL

const markTtlVal = (v, ttl) => ({val: v, ttl: getTTL(ttl), ts: Date.now()})

const set = (k, v, ttl) => { cacheMap.set(getHashCode(k), markTtlVal(v, ttl)) }

const get = k => checkTTlVal(cacheMap.get(getHashCode(k)), k)

const del = k => cacheMap.delete(getHashCode(k))

const clear = () => cacheMap.clear()

module.exports = {
  set,
  get,
  del,
  clear
}
