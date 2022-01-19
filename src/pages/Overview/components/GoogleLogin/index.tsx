import { Button } from 'antd';
import { GoogleIcon } from '@/components/Icon';
import { useGoogleApi } from 'react-gapi';
import { SyncOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

export default ({
  signedIn,
  setSignedIn,
  auth,
  setAuth,
}: {
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;
  auth?: gapi.auth2.GoogleAuth;
  setAuth: (auth: gapi.auth2.GoogleAuth) => void;
}) => {
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
          auth.signIn().then((user) => {
            setSignedIn(user.isSignedIn());
          })
        }
      >
        Authorize With Google
      </Button>
    )
  ) : (
    <SyncOutlined spin />
  );
};
