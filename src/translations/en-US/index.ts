import layout from './app-layout.json';
import settings from './settings.json';

const enUSMessages = {
  ...layout,
  ...settings,
} as const;

export default enUSMessages;
