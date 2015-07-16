# backend-proxy
Allow proxying a server intercepting rest calls you want to mock if they are not available

## getting started

```
npm install && npm start
```

also recommended using nodemon
```
npm install -g nodemon
```

## example of a basic config

first configure a map
```
// ./mocks/config.json

[{
	"regex": "api\/marketplace\/v1\/products\/[0-9]+",
	"methods": ["GET"],
	"call": "httpStatus",
	"args": [401]
}]

```

then create the handler for this map

```
// ./mocks/httpStatus.js
module.exports = function(req, res, next, args) {
	res.sendStatus(args[0]);
};

```

in that case, all request matching the regex in `./mocks/config.json` and using the specifed methods will be proxied to the httpStatus mock with suplied arguments
