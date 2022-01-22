declare namespace API {
  import type { ServantTitle, ServiceName, ServiceGroup } from '@/utils/constant';

  export type DateAvailability = {
    date: string;
    available: boolean;
  };

  export type UserAvailability = {
    user_name: string;
    availability: DateAvailability[];
  };

  export type Servant = {
    title: ServantTitle;
    name: string;
  };

  export type ServiceSummary = {
    date: string;
    name: ServiceName;
    servants: Servant[];
  };

  export type ServiceSummaryFilter = {
    date?: string;
    serviceGroups?: ServiceGroup[];
    servantTitles?: ServantTitle[];
  };
}
