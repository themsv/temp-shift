import enUSMessages from './en-US';

// Add more language imports as needed
export const messages = {
  'en-US': enUSMessages,
} as const;

export type SupportedLocale = keyof typeof messages;

export default messages;
