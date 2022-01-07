import React, { useState, useEffect } from 'react';
import { Modal, Upload, message, Button } from 'antd';
import styled from 'styled-components';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import styles from './index.less';
import type { UploadProps } from 'rc-upload';
import { getTypeDescription } from '@/utils/getTransactionTypeLabel';

import {
  pushEventUploadTransactionFile,
  pushEventUploadTransactionFileSuccess,
  pushEventUploadTransactionFileFail,
} from '@/tracking/featureEvent';
import { convertByteToMB } from '@/utils/byteConvert';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  > div {
    margin-bottom: 20px;
  }
`;

const UploadModal: React.FC<{
  show: boolean;
  onCloseUploadModal: () => void;
  onUploadSuccess: () => void;
  isUpdate: boolean;
  isShowUploadDescription: boolean;
  type: string;
}> = ({ show, onCloseUploadModal, onUploadSuccess, isUpdate, type, isShowUploadDescription }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { formatMessage } = useIntl();

  const { Dragger } = Upload;

  const handleCloseModal = () => {
    if (!isLoading) {
      onCloseUploadModal();
    }
  };

  const handleUpdateLoadingStatus = (isDone: boolean) => {
    if (isDone) {
      setIsLoading(false);
    } else if (!isLoading) {
      setIsLoading(true);
    }
  };

  const trackAction = isUpdate ? 'Update' : 'Upload';

  useEffect(() => {
    pushEventUploadTransactionFile({ action: trackAction });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false, // if they accept more than one file
    action: `/api/transaction/upload?file_type=${type}`, // upload location
    onChange(info: {
      file: {
        status: string;
        name: string;
        response: string;
        error: { status: number };
        size: number;
      };
    }) {
      const { file } = info;
      handleUpdateLoadingStatus(file.status !== 'uploading');
      if (file.status === 'done') {
        const { size } = file;
        const fileSize = convertByteToMB(size).toFixed(8);
        pushEventUploadTransactionFileSuccess({
          fileSize,
          action: trackAction,
        });
        message.success(`${file.name} file uploaded successfully.`);
        onUploadSuccess();
        onCloseUploadModal();
        // qeury company overview
      } else if (file.status === 'error') {
        const { size } = file;
        const fileSize = convertByteToMB(size).toFixed(8);
        pushEventUploadTransactionFileFail({
          fileSize,
          action: trackAction,
        });
        message.error(
          `${formatMessage({
            id: `error.${file.error?.status}`,
            defaultMessage:
              'Oops! Someting went Error. Please try again at a later time or contact a MoBagel representative',
          })}`,
        );
      }
    },
  };

  return (
    <Modal
      destroyOnClose
      visible={show}
      width={660}
      centered
      title={formatMessage({
        id: isUpdate ? 'dataUpload.mng.modal.title.update' : 'dataUpload.mng.modal.title.upload',
      })}
      onCancel={handleCloseModal}
      footer={[
        <Button key="cancel" loading={isLoading} onClick={handleCloseModal}>
          {formatMessage({ id: 'common.action.cancel' })}
        </Button>,
        <Button key="submit" type="primary" loading={isLoading} onClick={handleCloseModal}>
          {isUpdate
            ? formatMessage({ id: 'dataUpload.mng.table.action.update' })
            : formatMessage({ id: 'dataUpload.mng.table.action.upload' })}
        </Button>,
      ]}
    >
      <Container>
        <div>{formatMessage({ id: getTypeDescription(type) })}</div>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <CloudUploadOutlined />
          </p>
          <p className="ant-upload-text">
            {formatMessage({
              id: 'dataUpload.mng.modal.dropZone.title.transactionData',
            })}
          </p>
          {isShowUploadDescription && (
            <p className={styles.hint}>
              {formatMessage({
                id: 'dataUpload.mng.modal.dropZone.description.transactionData',
              })}
            </p>
          )}
        </Dragger>
      </Container>
    </Modal>
  );
};
export default UploadModal;
