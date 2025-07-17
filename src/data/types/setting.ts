export type SettingType =
  | 'numericAlignment'
  | 'country'
  | 'longTime'
  | 'defaultCurrency'
  | 'textAlignment'
  | 'shortTime'
  | 'clockFormat'
  | 'longDate'
  | 'defaultUniverse'
  | 'shortDate';

export interface UserSetting {
  userId: number;
  referenceId: number;
  type: SettingType;
  data: string;
}

interface SettingItem {
  id: number;
  type: SettingType;
  code: string;
  description: string;
  isDefault: boolean;
}

export interface StaticSettings {
  country: SettingItem[];
  defaultCurrency: SettingItem[];
  defaultUniverse: SettingItem[];

  longTime: SettingItem[];
  shortTime: SettingItem[];
  clockFormat: SettingItem[];
  longDate: SettingItem[];
  shortDate: SettingItem[];

  textAlignment: SettingItem[];
  numericAlignment: SettingItem[];
}
