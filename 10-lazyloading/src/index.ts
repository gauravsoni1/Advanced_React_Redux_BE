import config from './config/config';
import { server } from './service/socketio.service';

server.listen(config.port, () => {
  console.log(`Listening to port ${config.port}`);

  console.log(
    `
.|'''.|                                              '||'  '|'         
||..  '    ....  ... ..  .... ...   ....  ... ..      ||    |  ... ... 
 ''|||.  .|...||  ||' ''  '|.  |  .|...||  ||' ''     ||    |   ||'  ||
.     '|| ||       ||       '|.|   ||       ||         ||    |   ||    |
|'....|'   '|...' .||.       '|     '|...' .||.         '|..'    ||...' 
                                                                ||     
                                                               ''''    
  `,
  );
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
