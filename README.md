# Jethro Frontend

## Develop

### 2. setup

```bash
yarn install
yarn i18b:fetch
```

### 3. Run Project

Provides the following ways for you to execute the project

```bash
// 1. run default dev mode, and use mock data
yarn start

// 2. run default dev mode, and don't use mock data
yarn start:no-mock
```

All Commands

see [package.json](./package.json)

### 4. How To Add Environmental Variables

1. 透過 command line

```js
// cross-env 能夠讓你不用處理 OS 指令不同的問題
cross-env UMI_UI=none UMI_ENV=dev

// 不同作業系統指令如下
# OS X, Linux
$ PORT=3000 umi dev

# Windows (cmd.exe)
$ set PORT=3000 && umi dev
```

2. 透過 .env

在專案根目錄下已經有一個 .env 可以定義環境變數

**如果 command line 和 env 有衝突時優先選用 command line 的指令**

[See more umijs internal command](https://umijs.org/zh-CN/docs/env-variables)

How to use these env variables?

```js
const { REACT_APP_ENV }  process.env;
```

#### env 與 config 的應用

舉例：

UMI_ENV 為 test 時，必須在 config 下配置 config.test.ts 文件來管理 test 環境下的不同環境變數

package.json 內的 build 指令也可以根據不同環境去配置不同的 config

[https://beta-pro.ant.design/docs/environment-manage-cn](https://beta-pro.ant.design/docs/environment-manage-cn)

## Deploy

- make build
- make deploy

## Request & Fetch Data

### 1. Define API Function And Types

到 `src/services/login.ts` 然後檢查 method `userLogin`

```js
export async function userLogin(params: API.LoginParamsType) {
  return (
    request <
    API.LoginStateType >
    ('/api/login',
    {
      method: 'POST',
      data: params,
    })
  );
}
```

`API.LoginStateType` / `API.LoginParamsType` 是從哪來的？

在 `src/services/API.d.ts` 你會看到這些型別的定義

```js
declare namespace API {
  export type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    signature?: string;
    access?: 'user' | 'guest' | 'admin';
  };

  export type LoginStateType = {
    status?: 'ok' | 'error';
    type?: string;
  };

  export type LoginParamsType = {
    username: string;
    password: string;
  }
}
```

在這個檔案你能夠看到每隻 API 的參數應該有的型別

### 2. Use API

在隨便一個你想用的 component 內

```js
import { userLogin } from '@/services/login';

userLogin({
  username: 'Marsli',
  password: '123456',
}).then((res) => console.log(res));
```

### 3. Interceptors

有時候我們想要當 request 發出去前，response 回來前，request 時的意外處理都統一處理的話，我們就可以用到 Interceptors (攔截器)

到 `src/services/interceptor.ts` 內會發現有三個 function

- requestInterceptors (請求前攔截)
- responseInterceptors (回傳後攔截)
- errorHandler (錯誤處理)

可以統一針對請求做處理

[https://beta-pro.ant.design/docs/request-cn](https://beta-pro.ant.design/docs/request-cn)

程式好好維護，變數好好分類、好好命名，讓後人能少點 debug 的時間

> Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live. (Martin Golding)

寫程式時要保持這種心態：就好像將來要維護你這些程式的人是一位殘暴的精神病患者，而且他知道你住在哪。(Martin Golding)

### 4. Mock Data

在開發初期前後端需要先定好 API schema (input, output)，然後就可以各自開發了，然而前端可以透過 mock data 放入先約定好的假資料，然後在前端一樣正常的去 fetch data，mock mode 有開啟的話會自動將 mock data 內的資料放進 api 的 response 內，mock mode 可以在 package.json 內設定

參考 `mock/availability.ts`

```js
'GET /api/logout': {
  data: {}, success: true
}
'GET /api/currentUser': (req: Request, res: Response) => {
  if (!getAccess()) {
    res.status(401).send({
      data: {
        isLogin: false,
      },
      errorCode: '401',
      errorMessage: 'Please login first',
      success: true,
    });
    return;
  }
  res.send({
    name: 'Mars Li',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ23k-RhgGgJyR2Czesn_geYO14NlEtms6ZZg&usqp=CAU',
    userid: '00000001',
    signature: '人生好難',
    access: getAccess(),
  });
},
```

寫法非常簡單，基本只要參考 `/api/logout` 的寫法就可以了，如果需要針對不同情況做處理的話，可以參考 `/api/currentUser` 的寫法

更多用法請參考 [umi mock data doc](https://umijs.org/docs/mock)

### 5. Proxy

`config/config.ts` will check env variable `REACT_APP_ENV` to switch proxy server

and you also can modify proxy setting in `config/proxy.ts`

**proxy setting DOESN'T WORK in production env**

# State Management / Data Flow

1. useModel

## component

see `/src/components/index.md`

如果有不要用的，可以從 RightContent 中移除

## Internationalization and localization

結合了 `@umijs/plugin-locale` & `airtable`

目前預設在 build 階段才會去拉取最新的 i18n document

你也可以自動下指令去更新 i18n document

```js
yarn run i18n:fetch
```

## Routes / Menu

`config/routes.ts`

more detail

[https://umijs.org/zh-CN/docs/routing](https://umijs.org/zh-CN/docs/routing)

## Permission

在中後台應用中很多時候我們需要檢查使用者的權限然後去限制哪些頁面可以存取、哪些不行

在 MoEAB 中我們默認會使用 `access.ts` 這隻檔案來去做 permission check

1. 首先透過 `app.ts ⇒ getInitialState()` 去 fetch current user
2. 透過 access.ts 會自動帶入 initial state，可以透過 initial state 去判斷 user permission

```js
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    isAdmin: currentUser && currentUser.access === 'admin',
  };
}
```

3-1. Menu 使用

```js
// config/routes.ts
{
  path: '/admin',
  name: 'admin',
  icon: 'crown',
  access: 'isAdmin',  // Here
  component: './Admin',
  routes: [
    {
      path: '/admin/sub-page',
      name: 'sub-page',
      icon: 'smile',
      component: './Welcome',
    },
  ],
}
```

3-2. Component 使用

```js
import React from 'react';
import { useAccess } from 'umi';
const PageA = (props) => {
  const { foo } = props;
  const access = useAccess();

  if (access.canReadFoo) {
    // If can access Foo, than...
  }

  return <>TODO</>;
};
export default PageA;
```

@umijs/plugin-access

[https://umijs.org/zh-CN/plugins/plugin-access](https://umijs.org/zh-CN/plugins/plugin-access)

## Design

Customized themes

- Modify `config/theme.ts` , and see detail from [there](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)
- Config ant pro layout styling in `config/layout.ts`

Animation

- Lottie - [https://github.com/airbnb/lottie-web](https://github.com/airbnb/lottie-web)

## CI & CD

Open a merge request will trigger the ci pipeline, and it will deploy to dev server when pr is merged to develop branch. If you want to deploy to production server, merge develop branch to master branch.

### Build

```js
yarn run build
```

### Test

see `package.json` lint

- E2E: end to end test
- Prettier : An opinionated code formatter
  - `prettierrc`
- ESLint: Find Problems, Fix Automatically, Customize
  - yarn run lint
  - `.eslintrc.js`
  - `.stylelintrc.js`

```js
// 0 close
// 1 show warning
// 2 show error，stuck ci & commit
'import/prefer-default-export': 0,
```

### Release (not yet)
