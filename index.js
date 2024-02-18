const http = require('http');
const fs = require('fs');
const csvParser = require('csv-parser'); // You'll need to install this package

const server = http.createServer((req, res) => {
  if (req.url === '/data') { // Serve CSV data at this endpoint
    const results = [];
    fs.createReadStream('employee_data.csv')
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(results));
      });
  } else if (req.url === '/') { // Serve the HTML file when the root URL is requested
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Error: File Not Found');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

