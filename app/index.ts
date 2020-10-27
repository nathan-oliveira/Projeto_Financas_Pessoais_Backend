import server from './config/server';

function init() {
  server.listen(server.get('port'));
  console.log(`🚀 Server started on http://localhost:${server.get('port')}`);
}

init();
