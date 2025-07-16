import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import URLS from '@app/consts/urls';
import queryKeys from '@app/consts/query-keys';
import type { DefaultSettings } from '../types/setting';

async function getDefaultSettings() {
  const response = await axios.get<DefaultSettings>(URLS.defaultSettings);
  return response.data;
}

function useGetDefaultSettings() {
  return useQuery({
    queryKey: queryKeys.setting.default(),
    queryFn: getDefaultSettings,
    select: (data) => ({
      numericAlignment: data.numericAlignment.map((_) => ({ value: _.code, label: _.description })),
      country: data.country.map((_) => ({ value: _.code, label: _.description })),
      longTime: data.longTime.map((_) => ({ value: _.code, label: _.description })),
      defaultCurrency: data.defaultCurrency.map((_) => ({ value: _.code, label: _.description })),
      textAlignment: data.textAlignment.map((_) => ({ value: _.code, label: _.description })),
      shortTime: data.shortTime.map((_) => ({ value: _.code, label: _.description })),
      clockFormat: data.clockFormat.map((_) => ({ value: _.code, label: _.description })),
      longDate: data.longDate.map((_) => ({ value: _.code, label: _.description })),
      defaultUniverse: data.defaultUniverse.map((_) => ({ value: _.code, label: _.description })),
      shortDate: data.shortDate.map((_) => ({ value: _.code, label: _.description })),
    }),
  });
}
export default useGetDefaultSettings;
