import app from './config/express';
import config from './config';
import { logger } from './lib/logger';

app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
});
