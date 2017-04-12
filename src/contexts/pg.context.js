'use srict';

import Pgb    from 'pg-bluebird';
import config from '../../config/env';

const pgb = new Pgb();
let   connection = null;

/**
 * Executes given query
 * @parameter {query}, receives the query to be executed
 * @returns {Messages}
 */
function query(query) {
  let runQuery = function() {
    return connection.client.query(query);
  }

  if(!connection)
    connect()
      .then((cnn) => {
        return runQuery();
      });

  return runQuery();
}

/**
 * Create new connection if none exists already
 * @returns {Promisse}
 */
function connect() {
  if(!connection)
    return pgb.connect(config.db)
        .then(cnn => {
            connection = cnn;
            return connection;
        });

  return null;
}

export default { connect, query };
