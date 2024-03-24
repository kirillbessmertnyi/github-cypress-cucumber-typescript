Feature: Test Case 270
  Scenario: visiting the frontpage
    Given I am on web page "https://example.cypress.io"
    When I click on type
    Then URL should include "/commands/actions"

    When I click on type
    Then URL should include "/commands/type"
