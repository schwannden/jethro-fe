import moment from 'moment';
import { TitleMapping, DateFormat } from '@/utils/constant';
import type { ServiceGroup, ServantTitle } from '@/utils/constant';

export const getServiceSummery = async (
  spreadSheetClient: gapi.client.sheets.SpreadsheetsResource,
  filter: API.ServiceSummaryFilter,
) => {
  return spreadSheetClient.values
    .get({
      spreadsheetId: '1G3zqXsX6NwisgL3Al-cxQREsIFyYyFM1tEznClA0bug',
      range: '2022總表!A:U',
    })
    .then((resp) => resp.result.values || [])
    .then((rows: any[][]) => rows.filter((row) => row.length > 1))
    .then((rows: any[][]) => {
      const header = rows.shift();
      if (header == undefined || rows.length === 0) return [];

      const services: API.ServiceSummary[] = rows
        .map((row) =>
          row
            .map((value, index) => [header[index], value])
            .filter((record) => record[1] && record[1] !== '')
            .reduce((acc, record) => ({ ...acc, [record[0]]: record[1] }), {}),
        )
        .map((dict: Record<string, string>) => {
          const date = dict['日期'];
          const servants: API.Servant[] = Object.keys(dict)
            .filter((key) => key !== '日期' && key !== 'service.special-day')
            .map((originalKey) => ({
              title: TitleMapping[originalKey] || originalKey,
              name: dict[originalKey],
            }));
          const nameFilter: string[] = filter.servantNames ? filter.servantNames : [];
          const groupFilter: ServiceGroup[] = filter.serviceGroups ? filter.serviceGroups : [];
          const titleFilter: ServantTitle[] = filter.servantTitles ? filter.servantTitles : [];
          const filteredServants = servants.filter(
            (s) =>
              (groupFilter.length == 0 || groupFilter.some((group) => s.title.startsWith(group))) &&
              (titleFilter.length == 0 || titleFilter.includes(s.title)) &&
              (nameFilter.length == 0 || nameFilter.find((name) => s.name.includes(name))),
          );
          return {
            date,
            name: 'sunday-worship',
            servants: filteredServants,
          };
        });
      const validServices = services.filter((s) => s.date);
      const startDate = (filter.startDate && moment(filter.startDate)) || moment().startOf('day');
      const endDate = moment(startDate).endOf('month');
      if (endDate.diff(startDate, 'd') < 7) {
        endDate.add(1, 'day').endOf('month');
      }
      return validServices.filter(
        (s) => moment(s.date, DateFormat) >= startDate && moment(s.date, DateFormat) <= endDate,
      );
    });
};
