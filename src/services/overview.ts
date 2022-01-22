import moment from 'moment';
import { TitleMapping } from '@/utils/constant';

export const getOverview = async (spreadSheetClient: gapi.client.sheets.SpreadsheetsResource) => {
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
          const date = moment(dict['日期'], 'MM/DD/YYYY').format('MM/DD/YYYY');
          const servants: API.Servant[] = Object.keys(dict).map((originalKey) => ({
            title: TitleMapping[originalKey] || originalKey,
            name: dict[originalKey],
          }));
          return {
            date,
            name: 'sunday-worship',
            servants: servants,
          };
        });
      return services;
    });
};
