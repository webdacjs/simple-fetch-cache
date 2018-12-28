const {set, get} = require('./cache')

test(`Testing 'set' to add new entry to the cache`, () => {
  set('day', 'friday')
  expect(get('day')).toBe('friday')
})

test(`Testing persitance with 'get' from previous test`, () => {
  expect(get('day')).toBe('friday')
})

test(`Testing 'set' to add new entry to the cache`, () => {
  set('ephimeral', 'shouldberemovedsoon', 1)
  expect(get('ephimeral')).toBe('shouldberemovedsoon')
})

test(`Testing ephimeral with 'get' from previous test to be gone`, () => {
  setTimeout(() => {
    const ephimeralVal = get('ephimeral')
    expect(ephimeralVal).toBe(undefined)
  }, 500)
})
