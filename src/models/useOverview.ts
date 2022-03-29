import { useCallback, useState } from 'react';
import { getServiceSummery } from '@/services/overview';
import { useModel } from '@@/plugin-model/useModel';

export default function useOverview() {
  const [services, setServices] = useState<API.ServiceSummary[]>([]);
  const [servantNames, setServantNames] = useState<string[]>([]);
  const { spreadSheetClient } = useModel('useGoogleAPI');

  const syncServiceSummery: (filter?: API.ServiceSummaryFilter) => Promise<API.ServiceSummary[]> =
    useCallback(
      async (filter: API.ServiceSummaryFilter = {}) => {
        if (spreadSheetClient) {
          // @ts-ignore
          return getServiceSummery(spreadSheetClient, filter).then((res) => {
            setServices(res);
            const names: string[] = res
              .map((service) =>
                service.servants
                  .filter((s) => s.title.startsWith('jk'))
                  .map((s) => s.name.split('、')),
              )
              .flat(1)
              .flat(1);
            setServantNames([...new Set(names).values()]);
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
    servantNames,
    syncServiceSummery,
  };
}
