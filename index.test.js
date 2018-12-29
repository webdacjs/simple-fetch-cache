const {fetch} = require('./index')
const wikiprefix = 'https://wikimedia.org/api/rest_v1/'
const wikipagemetrics = '/metrics/pageviews/per-article/en.wikipedia/all-access/user/'
const wikiSamplePage = 'https://www.mediawiki.org/w/api.php'
const wikiJsonSample = `${wikiprefix}${wikipagemetrics}JavaScript/daily/20181224/20181225`
const wikiImageSample = 'https://upload.wikimedia.org/wikipedia/commons/5/56/Wikimedia_Foundation_Logo.png'

test(`Testing ${wikiSamplePage} page is not cached on first fetch`, () => {
  fetch(wikiSamplePage).then(r => {
    expect(get(r.cached)).toBe(false)
  })
})

test(`Testing ${wikiSamplePage} page is cached on second fetch`, () => {
  fetch(wikiSamplePage).then(r => {
    expect(get(r.cached)).toBe(true)
  })
})

test(`Testing ${wikiJsonSample} page is not cached on first fetch`, () => {
  fetch(wikiJsonSample).then(r => {
    expect(get(r.cached)).toBe(false)
  })
})

test(`Testing ${wikiJsonSample} page is cached on second fetch`, () => {
  fetch(wikiJsonSample).then(r => {
    expect(get(r.cached)).toBe(true)
  })
})

test(`Testing ${wikiImageSample} page is not cached on first fetch`, () => {
  fetch(wikiImageSample).then(r => {
    expect(get(r.cached)).toBe(false)
  })
})

test(`Testing ${wikiImageSample} page is cached on second fetch`, () => {
  fetch(wikiImageSample).then(r => {
    expect(get(r.cached)).toBe(true)
  })
})
