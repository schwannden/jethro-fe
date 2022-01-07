// see details in https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
import { navy, blue, red, green, yellow } from "../src/utils/color";

const PRIMARY_COLOR = blue[100];
const SECONDARY_COLOR = "#f9b814";
const DANGER_COLOR = red[100];
const SUCCESS_COLOR = green[100];
const PROCESSING_COLOR = "#3F79E0";
const ERROR_COLOR = red[100];
const HIGHLIGHT_COLOR = red[100];
const WARNING_COLOR = yellow[100];
const NORMAL_COLOR = navy[40];
const WHITE_COLOR = "#fff";
const GREEN_COLOR = green[100];
const RED_COLOR = red[100];
const BACKGROUND_COLOR = "#f0f5fc";
const TEXT_COLOR = navy[100];
const TEXT_SECONDARY_COLOR = navy[60];
const DISABLED_COLOR = "#99A6BB";
const ICON_COLOR = navy[60];
const AQUA_COLOR = "#07bcf4";
const PROGRESS_REMAIN_COLOR = "#ffffff";

const FONT_SIZE_BASE = "16px";
const H1_FONT_SIZE = "32px";
const H2_FONT_SIZE = "24px";
const H3_FONT_SIZE = "20px";
const H4_FONT_SIZE = "16px";
const H5_FONT_SIZE = "14px";
const TITLE_FONT_WEIGHT = "500";

export default {
  "primary-color": PRIMARY_COLOR,
  "secondary-color": SECONDARY_COLOR,
  "success-color": SUCCESS_COLOR,
  "processing-color": PROCESSING_COLOR,
  "error-color": ERROR_COLOR,
  "warning-color": WARNING_COLOR,
  "normal-color": NORMAL_COLOR,
  "danger-color": DANGER_COLOR,
  "info-color": PRIMARY_COLOR,
  "highlight-color": HIGHLIGHT_COLOR,
  "green-color": GREEN_COLOR,
  "red-color": RED_COLOR,
  "disabled-color": DISABLED_COLOR,
  "disabled-color-dark": "fade(#fff, 35%)",

  "font-family": "Noto Sans TC, Poppins",
  "heading-color": TEXT_COLOR,
  "link-color": PRIMARY_COLOR,
  "font-size-base": FONT_SIZE_BASE,
  "font-size-lg": `${parseInt(FONT_SIZE_BASE, 10) + 2}px`,
  "font-size-sm": `${parseInt(FONT_SIZE_BASE, 10) - 2}px`,
  // height rules
  "height-base": "30px",
  "height-lg": "39px",

  // Layout
  "layout-body-background": BACKGROUND_COLOR,

  // text
  "text-color": TEXT_COLOR,
  "text-color-secondary": TEXT_SECONDARY_COLOR,
  "text-color-inverse": WHITE_COLOR,
  "text-color-dark": `fade(${WHITE_COLOR}, 85%)`,
  "text-color-secondary-dark": `fade(${WHITE_COLOR}, 65%)`,
  "text-selection-bg": PRIMARY_COLOR,

  // Icon
  "icon-color": ICON_COLOR,
  "icon-color-hover": ICON_COLOR,

  // Menu
  "menu-item-active-bg": `${PRIMARY_COLOR}33`,
  "menu-highlight-color": PRIMARY_COLOR,
  "menu-item-padding-horizontal": "24px",
  "menu-item-padding": "0  24px",
  "select-item-selected-bg": `${PRIMARY_COLOR}33`,

  // layout mix mode
  // 'layout-header-background': PRIMARY_COLOR,

  // Descriptions
  "descriptions-item-padding-bottom": "8px",

  // Button
  "btn-primary-bg": AQUA_COLOR,
  "btn-border-radius-base": "20px",
  "btn-padding-horizontal-base": "18px",
  "btn-padding-horizontal-lg": "24px",

  // Card
  "card-radius": "12px",
  "card-shadow":
    "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12),0 5px 12px 4px rgba(0, 0, 0, 0.09)",
  "card-head-font-size": H3_FONT_SIZE,

  // Breadcrumb
  "breadcrumb-font-size": "14px",

  // Heading
  "heading-1-size": H1_FONT_SIZE,
  "heading-2-size": H2_FONT_SIZE,
  "heading-3-size": H3_FONT_SIZE,
  "heading-4-size": H4_FONT_SIZE,
  "heading-5-size": H5_FONT_SIZE,

  // Typography
  "typography-title-font-weight": TITLE_FONT_WEIGHT,

  // Page Heading
  "page-header-heading-title": H1_FONT_SIZE,
  "page-header-padding-breadcrumb": "24px",
  "page-header-content-padding-vertical": "16px",

  // Divider
  "divider-color": navy[40],

  // Table
  "table-font-size": `${parseInt(FONT_SIZE_BASE, 10) - 2}px`,

  // Progress
  "progress-remaining-color": PROGRESS_REMAIN_COLOR,
};
