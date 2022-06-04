import { useState } from 'react';
import { getUserAuthUrl } from '@/services/user';

export default function useFief() {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const queryUserAuthUrl = async () => {
    getUserAuthUrl().then(({ auth_url }) => {
      window.location.href = auth_url;
    });
  };

  return {
    signedIn,
    setSignedIn,
    queryUserAuthUrl,
  };
}
