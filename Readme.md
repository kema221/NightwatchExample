# Nightwatch
* 專門給網頁使用的自動化測試框架
* 使用 W3C WebDriver 所提供的 API 來自動操作瀏覽器 (過去稱為 Selenium WebDriver)
* 可簡化設定 CI 的過程、執行自動化測試、End-to-End　測試與單元測試

***

### 安裝相關套件

```sh
$ npm install nightwatch --save-dev
$ npm install selenium-server chromedriver --save-dev
$ npm install nightwatch-html-reporter --save-dev
```

### 環境設定
建立 nightwatch.config.js 檔案
#### nightwatch.config.js
環境設定
範例：

```js
const PKG = require('./package.json');
const GLOBALS = './globals.js';
const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
const config = {
    "src_folders": ["test/e2e"], //測試程式碼的位置
    "output_folder": "./reports", //測試報告的位置
    "page_objects_path": './page_objects', //Page Objects 的位置
    "custom_commands_path": './custom_commands', //客製化指令的位置
    "custom_assertions_path": './custom_assertions', //客製化斷言的位置
    "globals_path": GLOBALS, //External Globals 的位置
    "parallel_process_delay": 10,
    "selenium": { //Selenium Server 相關設定
        "start_process": true, // 是否啟動 server
        "server_path": seleniumServer.path, //Selenium Server 的位置，start_process 啟用時才需設定
        "log_path": "", //Log 的位置
        "host": "127.0.0.1",
        "port": 4444, //Selenium 所佔用的埠號
        "cli_args": { //要傳入 Selenium Process 的 cli 參數，這裡可分別對各個瀏覽器驅動程式的選項做設定
            "webdriver.chrome.driver": chromedriver.path
        }
    },
    "live_output": false, //是否即時顯示測試結果
    "test_workers": { //使用 Test Workers 的數量
        "enabled": true,
        "workers": "auto"
    },
    "test_settings": { //測試環境相關設定
        "default": { //預設的測試環境
            "launch_url": "http://localhost", //載入的網址
            "selenium_port": 4444, //Selenium Server 所用的埠號
            "selenium_host": "127.0.0.1", //Selenium Server 所用的 hostname / IP
            "silent": true, //是否顯示更多 Selenium 指令紀錄
            "globals": { //測試環境所代入的物件資料
                "waitForConditionTimeout": 10000,
                // "retryAssertionTimeout ": 500,
                "rtContext": {}
            },
            "desiredCapabilities": { //新建立 Session 時傳入 Selenium Webdriver 的物件
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        },
        "local": {
            "launch_url": "http://localhost",
            "selenium_port": 4444,
            "selenium_host": "127.0.0.1",
            "silent": true,
            "globals": {
                "waitForConditionTimeout": 15000
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        },
        "chrome": {
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        }
    }
}
module.exports = config;
```
### Create Your First Test
#### test\e2e\testDemo.js 
```js
module.exports = {
    'Nightwatch Demo Test': browser => {
        browser
            .url('https://www.google.com/')
            .waitForElementVisible('body')
            .end()
    }
}
```
### 開始測試
```sh
$ npm test
```

### 產生測試報告
```sh
$ nightwatch-html-reporter -d ./reports
```

### 指定測試環境
Nightwatch Test Runner 可使用 --env 代入指定的測試環境
沒有指定環境，就是預設環境 default

```
$ nightwatch
```
等於
```
$ nightwatch --env default
```

指定環境 local，將 --env 代入 local 即可。
```
nightwatch --env local
```

### Nightwatch unit tests
The tests for Nightwatch are written using [Mocha](http://mochajs.org/).

To run the complete test suite:

```sh
$ npm test
```

To check test coverage, run the command:

```sh
$ npm run mocha-coverage
```
and then open the generated _coverage/index.html_ file in your browser.
### 建立 runner
建立一個名稱為 nightwatch.js檔案
裡面放下列程式碼
```
require('nightwatch/bin/runner.js');
```
執行測試工作
```
$ node nightwatch.js
```
此時 nightwatch 就會根據 nightwatch.json 中的設定進行測試

### 測試不同瀏覽器
```
$ nightwatch -e default,chrome
```
### Command-line Options

| Name        | Shortname | default           | description                                                                                                                                       |
| ----------- | --------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| --config    | -c        | ./nightwatch.json | The location of the `nightwatch.json` file - the configuration file which the runner uses and which also includes the Selenium WebDriver options. |
| --output    | -o        | tests_output      | The location where the JUnit XML reports will be saved.                                                                                           |
| --env       | -e        | default           | Which testing environment to use - defined in `nightwatch.json`                                                                                   |
| --test      | -t        |                   | Shows extended selenium command logging during the session                                                                                        |
| --group     | -g        |                   | Runs only the specified group of tests (subfolder). Tests are grouped by being placed in the same subfolder. 根據資料夾做群組測試                 |
| --skipgroup | -s        |                   | Skip one or several (comma separated) group of tests.                                                                                             |
| --filter    | -f        |                   | Specify a filter (glob expression) as the file name format to use when loading the test files.                                                    |
| --tags      | -a        |                   | Filter test modules by tags. Only tests that have the specified tags will be loaded.                                                              |

### 單一測試
```
$ nightwatch -e chrome -g dlcs
```
***
### Clone this project for testing
```
$ git clone https://github.com/kema221/NightwatchExample.git

$ npm install

$ npm test

```

