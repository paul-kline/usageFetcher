import { scrape } from "./Scraper";

import http from "http";
const hostname = "127.0.0.1";
const port = 44444;

const server = http.createServer(async (req, res) => {
  console.log("\n\nSTARTING\n\n");
  console.log(req.url);
  if (req.url && req.url.includes("favicon")) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end("favicon wanted");
    return;
  }

  let data;
  try {
    data = await scrape();
  } catch (error) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: error, data: data, falser: false }));
    return;
  }
  console.log("about to end with: ", data);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
