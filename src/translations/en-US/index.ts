import layout from './app-layout.json';
import login from './sign-in.json';
import referenceData from './referenceData.json';
import settings from './settings.json';
import dashboard from './dashboard.json';

const enUSMessages = {
  ...layout,
  ...login,
  ...referenceData,
  ...settings,
  ...dashboard,
} as const;

export default enUSMessages;
