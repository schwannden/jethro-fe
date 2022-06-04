import { useState } from 'react';
import { getServiceSummery } from '@/services/overview';

export default function useOverview() {
  const [services, setServices] = useState<API.ServiceSummary[]>([]);
  const [servantNames, setServantNames] = useState<string[]>([]);

  const syncServiceSummery: (
    filter?: API.ServiceSummaryFilter,
  ) => Promise<API.ServiceSummary[]> = async (filter: API.ServiceSummaryFilter = {}) => {
    return getServiceSummery(filter).then((res) => {
      setServices(res);
      const names: string[] = res
        .map((service) =>
          service.servants.filter((s) => s.title.startsWith('jk')).map((s) => s.name.split('、')),
        )
        .flat(1)
        .flat(1);
      setServantNames([...new Set(names).values()]);
      return res;
    });
  };

  return {
    services,
    servantNames,
    syncServiceSummery,
  };
}
