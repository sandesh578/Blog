/** Graceful termination of application */
const path = require('path');
const log4js = require('log4js');
const { createHttpTerminator } = require('http-terminator');
const mongoClient = require('./utils/connect2db');
const { sleep } = require('./utils/custom-helpers');

const logger = log4js.getLogger(`${path.basename(__filename).split('.')[0]}`);

const gracefulTermination = async (error, server) => {
  try {
    logger.warn(
      'Received termination signal. Initiating graceful exit of application.'
    );
    if (error) logger.error(error);

    if (server) {
      // close server
      const httpTerminator = createHttpTerminator({ server });
      await httpTerminator.terminate();
      logger.warn('Server closed');
    }

    // close mongodb connections
    await mongoClient.closeDB();
    logger.warn('DB instance closed');

    logger.warn('Application closed successfully');
    await sleep(1000);
    await process.exit(0);
  } catch (err) {
    logger.error('Unable to exit gracefully, due to following error\n', err);
    logger.error('Initiating forced exit');
    process.exit(0);
  }
};

module.exports = gracefulTermination;
