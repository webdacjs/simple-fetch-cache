const nfetch = require('node-fetch')
const {set, get} = require('simple-map-cache')
const headersSubSetKeys = ['server', 'date', 'content-type', 'content-length']

const getHeadersSubset = headers => Object.keys(headers)
  .filter((key) => headersSubSetKeys.indexOf(key) >= 0)
  .reduce((subset, key) => Object.assign(
    subset, { [key]: headers[key] }), {})

const fetchLive = url => {
  return nfetch(url)
    .then(r => {
      return {
        buffer: r.buffer(),
        headers: getHeadersSubset(r.headers.raw()),
        type: r.headers.get('content-type'),
        status: r.status
      }
    })
}

const renderContent = (buffer, mtype) => {
  if (mtype.includes('text/html')) {
    return buffer.toString('utf-8')
  } else if (mtype.includes('application/json')) {
    return JSON.parse(buffer.toString('utf-8'))
  }
  return buffer
}

const cacheRenderBuffer = (url, replyObj, ttl, cached = false) => {
  if (replyObj.status === 200 && !cached) set(url, replyObj, ttl)
  return replyObj.buffer.then(x => ({
    reply: renderContent(x, replyObj.type),
    headers: replyObj.headers,
    status: replyObj.status,
    cached
  }))
}

const fetch = (url, ttl) => {
  return get(url)
    ? Promise.resolve(get(url))
      .then(r => cacheRenderBuffer(url, r, null, true))
    : fetchLive(url)
      .then(r => cacheRenderBuffer(url, r, ttl))
}

const fetchFresh = (url, ttl) => fetchLive(url)
  .then(r => cacheRenderBuffer(url, r, ttl))

module.exports = {
  fetch,
  fetchFresh
}
