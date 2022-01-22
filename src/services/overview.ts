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
      range: 'Q1!A2:T',
    })
    .then((resp) => resp.result.values || [])
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
          const servants: API.Servant[] = Object.keys(dict).map((originalKey) => ({
            title: TitleMapping[originalKey] || originalKey,
            name: dict[originalKey],
          }));
          const groupFilter: ServiceGroup[] = filter.serviceGroups ? filter.serviceGroups : [];
          const titleFilter: ServantTitle[] = filter.servantTitles ? filter.servantTitles : [];
          const filteredServants = servants.filter(
            (s) =>
              (groupFilter.length == 0 || groupFilter.some((group) => s.title.startsWith(group))) &&
              (titleFilter.length == 0 || titleFilter.includes(s.title)),
          );
          return {
            date,
            name: 'sunday-worship',
            servants: filteredServants,
          };
        });

      const dateFilter: string = filter.date || moment().format('MM/DD/YYYY');
      return services.filter((s) => moment(s.date, DateFormat) >= moment(dateFilter, DateFormat));
    });
};
