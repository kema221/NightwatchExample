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