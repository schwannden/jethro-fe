import { PageContainer } from '@ant-design/pro-layout';
import { GoogleApiProvider } from 'react-gapi';
import GoogleLogin from './components/GoogleLogin';
import ServiceOverview from './components/ServiceOverview';
import { useState } from 'react';

const OverviewPage: React.FC = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [auth, setAuth] = useState<gapi.auth2.GoogleAuth>();

  return (
    <PageContainer ghost title={false}>
      <GoogleApiProvider
        clientId={GOOGLE_CLIENT_ID}
      >
        <GoogleLogin signedIn={signedIn} setSignedIn={setSignedIn} auth={auth} setAuth={setAuth} />
        <ServiceOverview signedIn={signedIn} auth={auth} />
      </GoogleApiProvider>
    </PageContainer>
  );
};

export default OverviewPage;
