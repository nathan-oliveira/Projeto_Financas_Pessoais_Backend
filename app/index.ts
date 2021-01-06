import server from "./config/server";

function init() {
  server.listen(process.env.PORT || server.get("port") || 3000);
  console.log(`🚀 Server started on http://localhost:${server.get("port")}`);
}

init();
