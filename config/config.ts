// https://umijs.org/config/
import { defineConfig } from "umi";
import layoutSettings from "./layout";
import themeSettings from "./theme";
import proxy from "./proxy";
import routes from "./routes";

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: "zh-TW",
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: "@/components/PageLoading",
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  inlineLimit: 20000,
  proxy: proxy[REACT_APP_ENV || "dev"],
  manifest: {
    basePath: "./",
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: themeSettings,
  layout: layoutSettings,
  publicPath: '/jethro-fe/',
  chainWebpack(config) {
    config.module
      .rule("fonts")
      .test(/\.(eot|woff|woff2|ttf|otf)(\?.*)?$/)
      .use("file-loader")
      .loader("file-loader");
  },
  define: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
});
