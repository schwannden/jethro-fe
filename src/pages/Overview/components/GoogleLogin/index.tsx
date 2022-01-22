import { Button } from 'antd';
import { GoogleIcon } from '@/components/Icon';
import { useGoogleApi } from 'react-gapi';
import { SyncOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useIntl } from '@@/plugin-locale/localeExports';
import { useModel } from '@@/plugin-model/useModel';

export default () => {
  const { formatMessage } = useIntl();
  const { auth, setAuth, signedIn, setSignedIn, setSpreadSheetClient } = useModel('useGoogleAPI');

  const gapi = useGoogleApi({
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    scopes: ['profile', 'https://www.googleapis.com/auth/spreadsheets'],
  });

  useEffect(() => {
    if (gapi?.auth2) {
      const authInstance = gapi.auth2.getAuthInstance();
      authInstance.isSignedIn.listen(setSignedIn);
      setAuth(authInstance);
      setSignedIn(authInstance.isSignedIn.get());
    }
  }, [gapi, setSignedIn, setAuth]);

  useEffect(() => {
    if (gapi?.client?.sheets && signedIn) {
      // @ts-ignore
      setSpreadSheetClient(gapi.client.sheets.spreadsheets);
    }
  }, [gapi, signedIn, setSpreadSheetClient]);

  return auth ? (
    signedIn ? (
      <Button
        icon={<GoogleIcon />}
        style={{ width: '100%', alignItems: 'top', height: '40px' }}
        onClick={() => auth && auth.signOut()}
      >
        Logout
      </Button>
    ) : (
      <Button
        icon={<GoogleIcon />}
        style={{ width: '100%', alignItems: 'top', height: '40px' }}
        onClick={() =>
          auth &&
          auth.signIn({ redirect_uri: window.location.href }).then((user) => {
            setSignedIn(user.isSignedIn());
          })
        }
      >
        {formatMessage({ id: 'google.auth.prompt' })}
      </Button>
    )
  ) : (
    <SyncOutlined spin />
  );
};
