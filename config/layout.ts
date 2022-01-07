import { Settings as LayoutSettings } from "@ant-design/pro-layout";

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  locale?: boolean;
  siderWidth?: number;
} = {
  title: "Collector",
  locale: true,
  siderWidth: 208,
  headerHeight: 72,
  navTheme: "light", // light, dark
  layout: "top", // side, top, mix
  contentWidth: "Fluid",
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  iconfontUrl: "",
};

export default Settings;
