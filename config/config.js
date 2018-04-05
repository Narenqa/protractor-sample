const path = require("path");
const jsonReports = process.cwd() + "/reports/json";
const Reporter = require("../support/reporter");


exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  baseUrl: "https://w3layouts.com/login/",
  // webDriverProxy: 'http://localhost:8888',

  capabilities: {
    browserName: process.env.TEST_BROWSER_NAME || "chrome",
        proxy:{
            "proxyType": "manual",

          "httpProxy": "http://127.0.0.1:8888",
          // "httpProxyPort": 8888,
          "sslProxy": "http://127.0.0.1:8888"
          // "sslProxyPort": 8888

           }

  },
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["../features/*.feature"],
  exclude: "../features/database.feature",
  // resultJsonOutputFile: "./reports/json/protractor_report.json",
  onPrepare: function() {
    browser.ignoreSynchronization = true;
    global.driver = browser.driver;
    browser.manage().window().maximize();
    require('babel-register');
    Reporter.createDirectory(jsonReports);
  },
  cucumberOpts: {
    strict: true,
    format: 'pretty',
    keepAlive: false,

    format: 'json:./reports/json/cucumber_report.json',
    require: ["../stepDefinitions/*.js", "../support/*.js"],
    // tags: "(@AllureScenario or @CucumberScenario or @ProtractorScenario) and (not @DatabaseTest)" // @DatabaseTest scenario can be included when the username & password of DB have been configured in Support/database.js
    tags: "(@login-w3) and (not @DatabaseTest)" // @DatabaseTest scenario can be included when the username & password of DB have been configured in Support/database.js
  },
  onComplete: function () {
    Reporter.createHTMLReport();
  }
};
