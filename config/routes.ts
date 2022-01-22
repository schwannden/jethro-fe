export default [
  {
    path: "/",
    redirect: '/jethro-fe',
  },
  {
    path: "/jethro-fe",
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
    component: "./404",
  },
];
