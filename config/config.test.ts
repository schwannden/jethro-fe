// https://umijs.org/config/
import { defineConfig } from "umi";

/**
 * 導出的多環境變數：一律大寫 + 底線分割
 * 注意在添加變數後，需要在 src/typing.d.ts 內加上變數的型別宣告否則在使用時會出錯。
 */
export default defineConfig({
  define: {
    API_URL: "https://api-test.xxx.com",
    API_SECRET_KEY: "XXXXXXXXXXXXXXXX",
  },
});
