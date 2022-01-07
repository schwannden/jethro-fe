const Airtable = require("airtable");
const fs = require("fs");

// import .env config
require("dotenv").config();

const AIRTABLE_KEY = process.env.AIRTABLE_KEY;

// project
const AIRTABLE_I18N_BASE = process.env.AIRTABLE_I18N_BASE;
const AIRTABLE_I18N_TABLE = process.env.AIRTABLE_I18N_TABLE;
const AIRTABLE_I18N_VIEW = process.env.AIRTABLE_I18N_VIEW;

if (
  !AIRTABLE_KEY ||
  !AIRTABLE_I18N_BASE ||
  !AIRTABLE_I18N_TABLE ||
  !AIRTABLE_I18N_VIEW
) {
  console.error("[ERROR] should provide third argument in env: AIRTABLE_XXX");
  process.exit(-1);
  return;
}

const langObject = {
  "zh-TW": {},
  "en-US": {},
};

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: AIRTABLE_KEY,
});

const base = Airtable.base(AIRTABLE_I18N_BASE);

(async () => {
  fetchAirtable(base, AIRTABLE_I18N_TABLE, AIRTABLE_I18N_VIEW)
    .then((project) => {
      Object.entries(project).forEach(([key, value]) => {
        fs.writeFile(
          `./src/locales/${key}.json`,
          JSON.stringify(value),
          "utf8",
          () => {
            console.log("write file", key);
          }
        );
      });
    })
    .catch((err) => {
      console.error(err);
      process.exit(-1);
    });
})();

function fetchAirtable(base, table, view) {
  return new Promise((res) =>
    base(table)
      .select({ view })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            Object.entries(langObject).forEach(([key, value]) => {
              value[record.get("key")] = record.get(key);
            });
          });
          fetchNextPage();
        },
        (err) => {
          if (err) {
            console.error(err);
            process.exit(-1);
          }
          res(langObject);
        }
      )
  );
}
