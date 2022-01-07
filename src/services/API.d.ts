declare namespace API {
  export type DateAvailability = {
    date: string;
    available: boolean;
  };

  export type UserAvailability = {
    user_name: string;
    availability: DateAvailability[];
  };
}
