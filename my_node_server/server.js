const http = require('http');
const getSystemInfo = require('./systemInfo');
const logVisitor = require('./logVisitor');
const getLogFile = require('./readLogFile');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // Parse the URL

  if (parsedUrl.pathname === '/') {
 
    const studentInfoPath = path.join(__dirname, 'studentInfo.html');
    fs.readFile(studentInfoPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading student information');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else if (parsedUrl.pathname === '/system-info') {
    // System Info Endpoint
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(getSystemInfo()));
  } else if (parsedUrl.pathname === '/log-visit') {
    // Log Visit Endpoint
    const visitorData = `Visitor at ${new Date().toISOString()}`;
    logVisitor(visitorData);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Visit logged');
  } else if (parsedUrl.pathname === '/show-log') {
    // Show Log Endpoint
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(getLogFile());
  } else if (parsedUrl.pathname === '/query') {
    // Query Endpoint
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(parsedUrl.query));
  } else if (parsedUrl.pathname === '/get') {
    // Get Endpoint
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(res.getHeader('Content-Type'));
  } else {
    // Not Found Endpoint
    res.writeHead(404);
    res.end('Not Found');
  }
});

const port = 3000; // Use 3000 on or another port like 3001 we can use.
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});