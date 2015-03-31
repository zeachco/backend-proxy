# backend-proxy
Allow proxying a server intercepting rest calls you want to mock if they are not available

# example of a basic config (mockconf.json)

{
  "baseUrl": "mock",      // base path where mocks will be fetched
  "showServes": true,
  "showMocks": true,
  "showResponses": true,
  "host": "localhost",    // mocked backend host
  "port": 8080,           // mocked backend port
  "entryPort": 8081,      // server port to hist proxy
  "throttle": 500         // latency simulator in millisecs
}
