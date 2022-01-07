// This file is register micro app, but need add micro app in routes.ts

export default {
  open: false,
  sandbox: { strictStyleIsolation: true, experimentalStyleIsolation: true },
  singular: false, // at the same time, only one micro-app instance
  apps: [
    {
      name: "micro-app-home",
      entry: "//localhost:3000",
    },
    {
      name: "micro-app-about",
      entry: "//localhost:3000/about",
    },
  ],
};
