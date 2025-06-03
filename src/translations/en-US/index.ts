import app from './app.json';
import common from './common.json';

const enUSMessages = {
  ...app,
  ...common,
} as const;

export default enUSMessages;
