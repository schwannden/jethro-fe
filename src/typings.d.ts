declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
import type { Moment } from 'moment';

type Datetime = Moment;

// google analytics interface
type GAFieldsObject = {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
};

type Window = {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  reloadAuthorized: () => void;
};

declare let ga: () => void;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

type ServiceInfo = {
  service_name: string;
  external_domain?: string;
};

type SystemInfo = {
  max_campaign: number;
  max_transaction_records: number;
  services: ServiceInfo[];
  status: string;
};

type EmptyDict = Record<string, never>;

type AnyDict = Record<string, any>;

type CredentialType = 'ga' | 'minio';

type GACredential = {
  type: 'ga';
  client_id: string;
  client_secret: string;
  refresh_token: string;
  developer_token: string;
  login_customer_id: string;
  use_proto_plus: boolean;
};

type MinioCredential = {
  type: 'minio';
  host: string;
  access_key: string;
  secret_key: string;
  bucket: string;
};
