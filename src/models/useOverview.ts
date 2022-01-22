import { useCallback, useState } from 'react';
import { getServiceSummery } from '@/services/overview';
import { useModel } from '@@/plugin-model/useModel';

export default function useOverview() {
  const [services, setServices] = useState<API.ServiceSummary[]>([]);
  const { spreadSheetClient } = useModel('useGoogleAPI');

  const syncServiceSummery: (filter?: API.ServiceSummaryFilter) => Promise<API.ServiceSummary[]> =
    useCallback(
      async (filter: API.ServiceSummaryFilter = {}) => {
        if (spreadSheetClient) {
          // @ts-ignore
          return getServiceSummery(spreadSheetClient, filter).then((res) => {
            setServices(res);
            return res;
          });
        } else {
          return [];
        }
      },
      [spreadSheetClient],
    );

  return {
    services,
    syncServiceSummery,
  };
}
