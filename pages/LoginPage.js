
'use strict';
import Globals from '../support/Globals';
const globals = new Globals();
const expect = globals.expect;
// var users   = require( './../../resources/testdata/users.js' );
var config   = require( './../config/config.js' );
var EH   = require( './../support/ElementHelper.js' );
var {setDefaultTimeout} = require('cucumber');

setDefaultTimeout(60 * 1000);
var EC = protractor.ExpectedConditions;
( function () {

    /* #### CSS SELECTORS ### */
    let email = 'input[type="email"]';
    let password = "input[type='password']";
    let login_button = "input[value='Login']";
    let my_account = "div.user-drop-down div span";
    let log_out = "a[href='/logout']";
    let cancel_notification = "button#onesignal-popover-cancel-button";
    let logo = 'div.logo a img';


    /*Navigate to the site and check user login */
    var navigate = function () {
        return driver.findElement(by.css(cancel_notification)).click()
            .then(function () {

                browser.get(config.baseUrl+"/login/");
                expect(browser.getTitle()).to.eventually.equal(title);
            });

    };


     /*Login to the site using the userrole define in users.js */
      var login = function (userid,pass_word) {
          expect(driver.findElement(by.css(email)).isDisplayed());
        return driver.findElement(by.css(email)).sendKeys(userid)
            .then(sendText(password, pass_word))
            .then(function () {
               expect(driver.findElement(by.css(login_button)).isDisplayed());
            return driver.findElement(by.css(login_button)).click();
            }).then(function () {
                driver.findElement(by.css(cancel_notification)).click();
                expect(driver.findElement(by.css(logo)).isDisplayed());
                return true;

            });
    };

      let sendText = function (field, value) {
          expect(driver.findElement(by.css(field)).isDisplayed());
           return driver.findElement(by.css(field)).sendKeys(value);
      };
        
    var isLogged = function () {
         return browser.wait(driver.findElement(by.css(my_account)).isDisplayed())
             .then(
                function(flag) {
                    return flag;
                },
                function() {
                    return false;
                });


    };  
     var logout = function () {

         return browser.driver.sleep(3000)
             .then(function() {
                 expect(driver.findElement(by.css(my_account)).isDisplayed());
                 driver.findElement(by.css(my_account)).click()
                     .then(function () {
                         browser.driver.sleep(3000);
                         driver.findElement(by.css(log_out)).click();
                         return element(by.css(email)).isPresent();
                     });
             });

    };

    var LoginPage = function () {
    };

    LoginPage.prototype.navigate = navigate;
    LoginPage.prototype.login = login;
    LoginPage.prototype.isLogged = isLogged;
    LoginPage.prototype.logout = logout;
    module.exports = LoginPage;
}
)();
