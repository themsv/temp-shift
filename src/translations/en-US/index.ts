import app from './app.json';
import common from './common.json';
import layout from './app-layout.json';

const enUSMessages = {
  ...app,
  ...common,
  ...layout,
} as const;

export default enUSMessages;
