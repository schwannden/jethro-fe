declare namespace API {
  export type DateAvailability = {
    date: string;
    available: boolean;
  };

  export type UserAvailability = {
    user_name: string;
    availability: DateAvailability[];
  };

  export type ServantTitle =
    | 'prayer.lead'
    | 'general.preacher'
    | 'general.greeter'
    | 'jk.lead'
    | 'jk.piano'
    | 'jk.streaming'
    | 'jk.sound'
    | 'jk.ppt'
    | 'teacher.pre-3.lead'
    | 'teacher.pre-3.assist'
    | 'teacher.post-3'
    | 'meal.dishes'
    | 'meal.cook';

  export type Servant = {
    title: string;
    name: string;
  };

  export type ServiceName = 'friday-prayer' | 'sunday-worship';

  export type ServiceSummary = {
    date: string;
    name: ServiceName;
    servants: Servant[];
  };
}
