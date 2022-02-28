import { ctorConfig } from './webpack.config';

const config = ctorConfig('main');
delete config.devServer;
export default config;
