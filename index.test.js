const {fetch} = require('./index')
const wikiprefix = 'https://wikimedia.org/api/rest_v1/'
const wikipagemetrics = '/metrics/pageviews/per-article/en.wikipedia/all-access/user/'
const wikiSamplePage = 'https://www.mediawiki.org/w/api.php'
const wikiJsonSample = `${wikiprefix}${wikipagemetrics}JavaScript/daily/20181224/20181225`
const wikiImageSample = 'https://upload.wikimedia.org/wikipedia/commons/5/56/Wikimedia_Foundation_Logo.png'

const replyType = r => Object.prototype.toString.call(r).split(' ')[1].slice(0,-1)


test(`Testing ${wikiSamplePage} page is not cached on first fetch`, () => {
  fetch(wikiSamplePage).then(r => {
    expect(r.cached).toBe(false)
  })
})

test(`Testing ${wikiSamplePage} page is cached on second fetch and a String`, () => {
  setTimeout(() => {
    fetch(wikiSamplePage).then(r => {
      expect(r.cached).toBe(true)
      expect(replyType(r.reply)).toBe('String')
    })
  }, 500)
})

test(`Testing ${wikiJsonSample} page is not cached on first fetch`, () => {
  fetch(wikiJsonSample).then(r => {
    expect(r.cached).toBe(false)
  })
})

test(`Testing ${wikiJsonSample} page is cached on second fetch and JSON type`, () => {
  setTimeout(() => {
    fetch(wikiJsonSample).then(r => {
      expect(r.cached).toBe(true)
      expect(replyType(r.reply)).toBe('Object')
    })
  }, 500)
})

test(`Testing ${wikiImageSample} page is not cached on first fetch`, () => {
  fetch(wikiImageSample).then(r => {
    expect(r.cached).toBe(false)
  })
})

test(`Testing ${wikiImageSample} page is cached on second fetch`, () => {
  setTimeout(() => {
    fetch(wikiImageSample).then(r => {
      expect(r.cached).toBe(true)
    })
  }, 500)
})
