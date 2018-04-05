import Globals from '../support/Globals';
import { browser } from 'protractor';
import { Given, When, Then } from "cucumber";

// Chai
const globals = new Globals();
const expect = globals.expect;
var LoginPage     = require( './../pages/LoginPage.js' );
var loginPage= new LoginPage();

Given(/^I navigate to layouts login page with title "([^"]*)"$/,(title) => {
    // return loginPage.navigate();
     return expect(browser.getTitle()).to.eventually.equal(title);
});

When(/^I login as valid user$/, () => {
     return loginPage.login("w3login@mailinator.com","w3login123");
        
});

Then(/^I should be logged in$/, () => {
    
     return loginPage.isLogged();

});

Then(/^Verify the logout exists$/, () => {
     return loginPage.logout();

});