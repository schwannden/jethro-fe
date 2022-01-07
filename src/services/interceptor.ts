import { message } from 'antd';
import type { ResponseError } from 'umi-request';
import { formatMessage } from 'umi';

const errorHandler = async (error: ResponseError) => {
  const { response } = error;
  const { skipMessage = [] } = error.request.options;
  if (response && response.status) {
    const { status } = response;
    let errorMessage = formatMessage({ id: `error.${status}` }); // by default assume it is uncaught be error
    if (error.data?.error_code)
      // if error_code exist, it is from one of the HTTPException
      errorMessage = formatMessage({ id: `error.${error.data.error_code}` }, error.data.detail);
    else if (error.data?.detail) {
      // if error_code not exist, but detail exist, it is from fast-api validation
      errorMessage = formatMessage(
        { id: `error.${error.response.status}` },
        {
          message: JSON.stringify(error.data.detail),
        },
      );
    }
    if (!skipMessage.includes(error.response.status)) {
      message.error(errorMessage, 3);
    }
  }

  if (!response) {
    message.error(`Network error: ${error}`);
    // eslint-disable-next-line no-console
    console.error(error);
  }
  throw error;
};

export default {
  prefix: '/api',
  errorHandler,
};
