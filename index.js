const server = require("./server.js");

const PORT = 4400;

server.listen(PORT, () => {
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`);
});
