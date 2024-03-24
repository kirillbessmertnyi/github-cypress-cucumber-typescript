import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on web page {string}", (webpage) => {
  cy.visit(`${webpage}`)
});

When("I click on type", ()=>{
  cy.contains('type').click()
})

When("I type {string} to locator {string}", (msg,locator)=>{
  cy.get(`${locator}`).type(`${msg}`)
})

Then("URL should include {string}", (pattern)=>{
  cy.url().should('include', `${pattern}`);
});

Then ("Locator {string} should have value {string}", (locator, value)=>{
  cy.get(`${locator}`).should('have.value', `${value}`)
});