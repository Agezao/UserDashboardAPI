import * as pgContext from './src/contexts/pg.context.js';
import util 		  from 'util';
import config 		  from './config/env';
import app 			  from './config/express';

const debug = require('debug')('userdashboardapi:index');

// Setting up postgres database
let ctx = pgContext.connect();
if(ctx)
	ctx.then(() => console.log('Connected to DB')).catch(() => console.log('Failed to connect to DB'));

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    debug(`server started on port ${config.port} (${config.env})`);
  });
}

export default app;
