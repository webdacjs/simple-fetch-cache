const nfetch = require('node-fetch')
const {set, get} = require('./cache')

const fetchLive = url => {
  return nfetch(url)
    .then(x => {
      return {
        buf: x.buffer(),
        type: x.headers.get('content-type')
      }
    })
}

const renderContent = (buffer, ctype) => {
  if (ctype.includes('text/html')) {
    return buffer.toString('utf-8')
  } else if (ctype.includes('application/json')) {
    return JSON.parse(buffer.toString('utf-8'))
  }
  return buffer
}

const bufferToContent = (url, buf, ttl) => {
  set(url, buf, ttl)
  return buf.buf.then(x => renderContent(x, buf.type))
}

const fetch = (url, ttl) => {
  return get(url)
    ? Promise.resolve(get(url))
      .then(buf => buf.buf
      .then(x => renderContent(x, buf.type)))
    : fetchLive(url)
      .then(x => bufferToContent(url, x, ttl))
}

const fetchFresh = (url, ttl) => fetchLive(url)
  .then(x => bufferToContent(url, x, ttl))

module.exports = {
  fetch,
  fetchFresh
}
