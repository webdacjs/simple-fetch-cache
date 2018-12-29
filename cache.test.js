const {set, get, del} = require('./cache')

test(`Testing 'set' to add new entry to the cache`, () => {
  set('day', 'friday')
  expect(get('day')).toBe('friday')
})

test(`Testing persitance with 'get' from previous test`, () => {
  expect(get('day')).toBe('friday')
})

test(`Testing 'set' to add new entry to the cache`, () => {
  set('ephimeral', 'shouldberemovedsoon', 100)
  expect(get('ephimeral')).toBe('shouldberemovedsoon')
})

test(`Testing ephimeral with 'get' from previous test to be gone`, () => {
  setTimeout(() => {
    const ephimeralVal = get('ephimeral')
    expect(ephimeralVal).toBe(undefined)
  }, 500)
})

test(`Testing non-existant entry with 'get' to be undefined `, () => {
  expect(get('shoudlnotexists')).toBe(undefined)
})

test(`Testing deleting the existing 'day' entry`, () => {
  del('day')
  expect(get('day')).toBe(undefined)
})
