import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import URLS from '@app/consts/urls';
import queryKeys from '@app/consts/query-keys';

import type { SettingType, UserSetting } from '@app/data/types/setting';

async function getUserSettings() {
  const response = await axios.get<UserSetting[]>(URLS.settingsByUser);
  return response.data;
}

function useGetUserSettings() {
  // TODO: Pull userId from token or context and pass for query cache
  return useQuery({
    queryKey: queryKeys.setting.byUser('101'),
    queryFn: getUserSettings,
    select: (data) => ({
      original: data,
      transformed: data.reduce<Record<SettingType, UserSetting['data']>>(
        (acc, setting) => {
          acc[setting.type] = setting.data;
          return acc;
        },
        {} as Record<SettingType, UserSetting['data']>,
      ),
    }),
  });
}
export default useGetUserSettings;
