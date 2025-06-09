import layout from './app-layout.json';
import referenceData from './referenceData.json';
import settings from './settings.json';

const enUSMessages = {
  ...layout,
  ...referenceData,
  ...settings,
} as const;

export default enUSMessages;
