const http = require("http");

http
  .createServer((request, response) => {
    if (request.url.toLowerCase() === "/events") {
      response.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      });
      let id = 0;
      setInterval(() => {
        id += 1;
        console.log("id :: ", id);
        const price = Math.ceil(Math.random() * 10);
        response.write(`data: {"id": ${id}, "price": ${price}}`);
        response.write("\n\n");
      }, 3000);
    } else {
      response.writeHead(404);
      response.end();
    }
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000/");
  });
