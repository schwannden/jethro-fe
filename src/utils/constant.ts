export const ServantTitleKeys = [
  'general.prayer.lead',
  'general.preacher',
  'general.greeter',
  'general.sacrament',
  'jk.lead',
  'jk.piano',
  'jk.streaming',
  'jk.sound',
  'jk.ppt',
  'jk.vocal1',
  'jk.vocal2',
  'jk.guitar',
  'teacher.pre-3.lead',
  'teacher.pre-3.assist',
  'teacher.post-3',
  'meal.dishes',
  'meal.cook',
] as const;
export type ServantTitleKeysArray = typeof ServantTitleKeys;
export type ServantTitle = ServantTitleKeysArray[number];

export const ServiceNameKeys = ['friday-prayer', 'sunday-worship'] as const;
export type ServiceNameKeyArray = typeof ServiceNameKeys;
export type ServiceName = ServiceNameKeyArray[number];

export const ServantGroupKeys = ['general', 'teacher', 'jk', 'meal'] as const;
export type ServiceGroupKeyArray = typeof ServantGroupKeys;
export type ServiceGroup = ServiceGroupKeyArray[number];

export const TitleMapping = {
  兒主中年級: 'teacher.post-3',
  司琴: 'jk.piano',
  合音1: 'jk.vocal1',
  合音2: 'jk.vocal2',
  吉他: 'jk.guitar',
  幼兒主理: 'teacher.pre-3.lead',
  幼兒助理: 'teacher.pre-3.assist',
  愛筵: 'meal.cook',
  投影片: 'jk.ppt',
  招待: 'general.greeter',
  擘餅: 'general.sacrament',
  洗碗: 'meal.dishes',
  特別日子: 'service.special-day',
  直播: 'jk.streaming',
  講員: 'general.preacher',
  音控: 'jk.sound',
  領會: 'jk.lead',
};
