import { useState } from 'react';

export default function useGoogleAPI() {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [auth, setAuth] = useState<gapi.auth2.GoogleAuth>();
  const [spreadSheetClient, setSpreadSheetClient] =
    useState<gapi.client.sheets.SpreadsheetsResource>();

  return {
    signedIn,
    setSignedIn,
    auth,
    setAuth,
    spreadSheetClient,
    setSpreadSheetClient,
  };
}
