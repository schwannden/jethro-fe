export default [
  {
    path: "/",
    name: "overview",
    component: "./Overview",
  },
  {
    path: "/availability",
    name: "availability",
    component: "./Availability",
    hideInMenu: true,
  },
  {
    path: "/privacy",
    name: "privacy",
    component: "./privacy",
    hideInMenu: true,
  },
  {
    component: "./404",
  },
];
