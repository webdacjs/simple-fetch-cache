const {fetch} = require('./index')
const wikiSamplePage = 'https://www.mediawiki.org/w/api.php'

test(`Testing ${wikiSamplePage} page is not cached on first fetch`, () => {
  fetch(wikiSamplePage, null, true).then(r => {
    expect(get(r.cached)).toBe(false)
  })
})

test(`Testing ${wikiSamplePage} page is cached on second fetch`, () => {
  fetch(wikiSamplePage, null, true).then(r => {
    expect(get(r.cached)).toBe(true)
  })
})
