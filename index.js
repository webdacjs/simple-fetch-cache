const nfetch = require('node-fetch')
const {set, get} = require('./cache')

const fetchLive = url => {
  return nfetch(url)
    .then(r => {
      return {
        buffer: r.buffer(),
        type: r.headers.get('content-type'),
        status: r.status
      }
    })
}

const renderContent = (buffer, mtype, checkIsCached) => {
  if (checkIsCached) {
    return true
  }
  if (mtype.includes('text/html')) {
    return buffer.toString('utf-8')
  } else if (mtype.includes('application/json')) {
    return JSON.parse(buffer.toString('utf-8'))
  }
  return buffer
}

const cacheRenderBuffer = (url, replyObj, ttl) => {
  const {status} = replyObj
  delete replyObj.status
  if (status === 200) {
    set(url, replyObj, ttl)
  }
  return replyObj.buffer.then(x => renderContent(x, replyObj.type))
}

const fetch = (url, ttl, checkIsCached) => {
  return get(url)
    ? Promise.resolve(get(url))
      .then(r => r.buffer
      .then(buffer => renderContent(buffer, r.type, checkIsCached)))
    : fetchLive(url)
      .then(r => cacheRenderBuffer(url, r, ttl))
}

const fetchFresh = (url, ttl) => fetchLive(url)
  .then(r => cacheRenderBuffer(url, r, ttl))

module.exports = {
  fetch,
  fetchFresh
}
