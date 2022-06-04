import { Button } from 'antd';
import { FiefIcon } from '@/components/Icon';
import { useIntl } from '@@/plugin-locale/localeExports';
import { useModel } from '@@/plugin-model/useModel';

export default () => {
  const { formatMessage } = useIntl();
  const { signedIn, queryUserAuthUrl } = useModel('useFief');

  return signedIn ? (
    <Button
      icon={<FiefIcon />}
      style={{ width: '100%', alignItems: 'bottom', height: '50px' }}
      onClick={() => {}}
    >
      Logout
    </Button>
  ) : (
    <Button
      icon={<FiefIcon />}
      style={{ width: '100%', alignItems: 'center', height: '50px' }}
      onClick={queryUserAuthUrl}
    >
      {formatMessage({ id: 'google.auth.prompt' })}
    </Button>
  );
};
