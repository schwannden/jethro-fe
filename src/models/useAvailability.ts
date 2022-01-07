import { useCallback, useState } from 'react';
import { getAvailability } from '@/services/availability';

export default function useAvailability() {
  const [availabilities, setAvailabilities] = useState<API.UserAvailability[]>([]);

  const syncAvailabilities: () => Promise<API.UserAvailability[]> = useCallback(async () => {
    return getAvailability().then((res) => {
      setAvailabilities(res);
      return res;
    });
  }, []);

  return {
    availabilities,
    syncAvailabilities,
  };
}
