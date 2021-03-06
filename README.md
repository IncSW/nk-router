# nk-router
NamiKoi url router

[![NPM](https://nodei.co/npm/nk-router.png)](https://nodei.co/npm/nk-router)

[![Build Status](https://img.shields.io/travis/IncSW/nk-router/master.svg?style=flat-square)](https://travis-ci.org/IncSW/nk-router)
[![Code Climate](https://img.shields.io/codeclimate/github/IncSW/nk-router.svg?style=flat-square)](https://codeclimate.com/github/IncSW/nk-router)



## Installation
```bash
$ npm install nk-router
```



## Build from src
```bash
$ npm run build
```
or
```bash
$ npm install babel -g
$ babel src --out-dir lib
```



## Test
```bash
$ npm test
```
or
```bash
$ npm install mocha -g
$ mocha test
```



## Benchmark
```bash
$ npm run bench
```



## Usage
[Examples](https://github.com/IncSW/nk-router/blob/master/examples)

#### Base
```js
var nkRouter = require('nk-router'),
    router = nkRouter.router(),
    matched;

router.add('base', nkRouter.route('GET', '/', function() {
    response.end('Hello World!');
}));

matched = router.match('GET', '/');
if (matched === null) {
    console.log('404 Not Found');
} else {
    matched.route.handler();   
}
```

#### With http
```js
var http = require('http'),
    nkRouter = require('nk-router'),
    router = nkRouter.router();

router.add('base', nkRouter.route('GET', '/', function(request, response, data) {
    response.end('Hello World!');
}));

http.createServer(function(request, response) {
    var matched = router.matchRequest(request);
    
    if (matched === null) {
        response.statusCode = 404;
        response.end('404 Not Found');
        return;
    }
    matched.route.handler(request, response, matched.data);
}).listen(8888);
```



## API Documentation
#### nkRouter.route()
Returns a new instance of `nkRouter.Route`.

#### nkRouter.router()
Returns a new instance of `nkRouter.Router`.

#### nkRouter.methods
* `Array`

A list of the supported HTTP methods.

#### Class: nkRouter.Route
##### route.constructor(method, path, handler)
* method `String`
* path `String`
* handler `Function`

Parameters sets with `:` before name.
```
/post/:id
```
Parameters can have modifiers: `string` (default), `integer`, `float`.
```
/post/:id:integer
/post/:id:integer/:title
```

##### route.match(method, url)
* method `String`
* url `String`

Checking if method and url matched.
Returns [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of parameters if matched or `null`.

##### route.getUrl([parameters])
* parameters `Object` // `Map` is depricated

Generating url from route.
Returns url `String` if all parameters are set or `null`.

#### Class: nkRouter.Router
##### router.add(key, route)
* key `String`
* route `nkRouter.Route`

Adding named route in router. Key must be unique.

##### router.route(key)
* key `String`

Finding `nkRouter.Route` by unique key.
Returns instance of `nkRouter.Route` if key found or `null`.

##### router.match(method, url)
* method `String`
* url `String`

Checking if any `nkRouter.Route` matched.
Returns [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of parameters if matched or `null`.

##### router.matchRequest(request)
* request `http.ClientRequest`

Calling `router.match` with parameters from `http.ClientRequest`.

##### router.getUrl(key [, parameters])
* parameters `Object` // `Map` is depricated

Finding `nkRouter.Route` by unique key and getting url from it.
Returns url `String` if found or `null`.


## License
[MIT](https://github.com/IncSW/nk-router/blob/master/LICENSE)