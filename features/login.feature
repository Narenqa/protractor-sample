Feature: To search allure reports in google

    @login-w3
    Scenario: Verify login w3layouts
      Given I navigate to layouts login page with title "Free Responsive Mobile Website Templates Designs - w3layouts.com"
      When I login as valid user
      Then I should be logged in
      Then Verify the logout exists
