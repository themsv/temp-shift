import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import URLS from '@app/consts/urls';
import queryKeys from '@app/consts/query-keys';

interface UpdateSettingPayload {
  id: number;
  type: string;
  data: string;
}

async function updateUserSettings(payload: UpdateSettingPayload) {
  const response = await axios.put(URLS.settingsByUser, [payload]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
}

function useUpdateUserSettings() {
  const queryClient = useQueryClient();

  // TODO: Pull userId from token or context and pass for query cache
  return useMutation({
    mutationKey: queryKeys.setting.byUser('101'),
    mutationFn: (payload: UpdateSettingPayload) => updateUserSettings(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.setting.byUser('101') });
    },
  });
}
export default useUpdateUserSettings;
