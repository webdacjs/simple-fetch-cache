
# Simple Fetch Cache

This module performs `fetch` requests using the `node-fetch` package, offering some basic caching functionality.

The motivation behind it is to have a simple but functional module to avoid hitting the live servers more than needed / allowed (ie. using an API with a quota)

Simple fetch cache calls the requested url and cache the results in memory using its own Map Object.

The reply is cached only if the server issue a 200 status code http response. Also the reply from the module indicates if the request comes from the cache:

```js
// First request

> const {fetch} = require('simple-fetch-cache')
> const wikiprefix = 'https://en.wikipedia.org/w/api.php?action=query&format=json'
>
> fetch(`${wikiprefix}&prop=coordinates&utf8=&titles=dublin`).then(r => console.log(r))
> { reply:
   { batchcomplete: '',
     query: { normalized: [Object], pages: [Object] } },
  headers:
   { date: [ 'Sat, 29 Dec 2018 20:27:44 GMT' ],
     'content-type': [ 'application/json; charset=utf-8' ],
     server: [ 'mw1286.eqiad.wmnet' ] },
  status: 200,
  cached: false }

// Next request
> fetch(`${wikiprefix}&prop=coordinates&utf8=&titles=dublin`).then(r => console.log(r))
> { reply:
   { batchcomplete: '',
     query: { normalized: [Object], pages: [Object] } },
  headers:
   { date: [ 'Sat, 29 Dec 2018 20:27:44 GMT' ],
     'content-type': [ 'application/json; charset=utf-8' ],
     server: [ 'mw1286.eqiad.wmnet' ] },
  status: 200,
  cached: true }

```

The module only has an external `node-fetch` dependency to fetch the requested urls and Jest as dev dependency to run the tests.

## Install

You can install with [npm]:

```sh
$ npm install --save simple-fetch-cache
```

## Usage

The module provides two main functions: `fetch` to get the required url and cache it if possible and `fetchFresh` to get a fresh copy of the url and refresh the cache. So following up with the previous example

```js
// First request

> const {fetch, fetchFresh} = require('simple-fetch-cache')
> const wikiprefix = 'https://en.wikipedia.org/w/api.php?action=query&format=json'
>
> fetch(`${wikiprefix}&prop=coordinates&utf8=&titles=dublin`).then(r => console.log(r))
> { reply:
   { batchcomplete: '',
     query: { normalized: [Object], pages: [Object] } },
  headers:
   { date: [ 'Sat, 29 Dec 2018 20:27:44 GMT' ],
     'content-type': [ 'application/json; charset=utf-8' ],
     server: [ 'mw1286.eqiad.wmnet' ] },
  status: 200,
  cached: false }

// Next request
> fetch(`${wikiprefix}&prop=coordinates&utf8=&titles=dublin`).then(r => console.log(r))
> { reply:
   { batchcomplete: '',
     query: { normalized: [Object], pages: [Object] } },
  headers:
   { date: [ 'Sat, 29 Dec 2018 20:27:44 GMT' ],
     'content-type': [ 'application/json; charset=utf-8' ],
     server: [ 'mw1286.eqiad.wmnet' ] },
  status: 200,
  cached: true }

// Fresh request

> fetchFresh(`${wikiprefix}&prop=coordinates&utf8=&titles=dublin`).then(r => console.log(r))
> { reply:
   { batchcomplete: '',
     query: { normalized: [Object], pages: [Object] } },
  headers:
   { date: [ 'Sat, 29 Dec 2018 20:38:49 GMT' ],
     'content-type': [ 'application/json; charset=utf-8' ],
     server: [ 'mw1342.eqiad.wmnet' ] },
  status: 200,
  cached: false }

```

#### Response format

As exposed in the previous example, the module returns in the response an object with the following 4 parameters:

| Parameter     | Description   |
| ------------- |:-------------:|
| reply         | Message body from the server, converted to `JSON` if the mime-type is `application/json`, `String` if the type is `text/html`. Otherwise it will return a Buffer so you can further deal with it (ie. pipe image to a file)|
| headers      | Abridged version of the headers, including `date, server, content-type & content-length`      |
| status | Status code returned from the server (ie. 200, 404, 500 or 418)      |
| cached | Boolean from simple-fetch-cache indicating if the request is cached (`true` or `false`) |

#### Time to live (TTL)

All the requests cached in memory will persist there as long as the process in running. Nevertheless if you require the cache to expire after X miliseconds, you can pass it as a second parameter to the `fetch` function:

```js
// Cache will expire after 1 hour.

> const {fetch} = require('simple-fetch-cache')
> const wikiprefix = 'https://en.wikipedia.org/w/api.php?action=query&format=json'
> const onehourMsec = 3600000
> fetch(`${wikiprefix}&prop=coordinates&utf8=&titles=dublin`, onehourMsec).then(r => console.log(r))

```

### License

Copyright © 2018, [Juan Convers](https://github.com/webdacjs).
Released under the [MIT License](LICENSE).
