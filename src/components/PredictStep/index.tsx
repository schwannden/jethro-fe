import React, { Fragment } from 'react';
import { useIntl } from 'umi';

import { Steps } from 'antd';

const { Step } = Steps;

const PredictStep: React.FC<{ current: number }> = ({ current }) => {
  const { formatMessage } = useIntl();
  return (
    <Fragment>
      <Steps current={current}>
        <Step
          subTitle={formatMessage({
            id: 'predictionFlow.stepper.goalListSetting',
            defaultMessage: 'Set the managing goal and condition',
          })}
        />
        <Step
          subTitle={formatMessage({
            id: 'predictionFlow.stepper.inProgress',
            defaultMessage: 'Predict the list',
          })}
        />
      </Steps>
    </Fragment>
  );
};

export default PredictStep;
