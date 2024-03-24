import { EnvAquaRestConfig } from '../../aquaClient/envAquaRestConfig';
import { ApiTestExecutionNew, ApiTestStepExecutionStepType, ApiTestStepExecutionUpdateStatus, TestExecutionClient } from '../../aquaClient/src/api/aqua';
import './commands'
import fetch from "node-fetch";

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach (() => {

})

afterEach(async function () {

    const restConfig = new EnvAquaRestConfig();
    const client = new TestExecutionClient(restConfig.url, { fetch });
    const testCaseId = Number(Cypress.spec.fileName);

    cy.log(Cypress.spec.fileName);
    let stepStatus = ApiTestStepExecutionUpdateStatus.Pass;
    if (this.currentTest.state === 'failed') {
      stepStatus = ApiTestStepExecutionUpdateStatus.Failed;
    } else if (this.currentTest.state != 'passed') {
      throw new Error('no such status for test case execution');
    }
    
    const executionData = {
      Guid: undefined,
      TestCaseId: testCaseId,
      TestCaseName: undefined,
      Finalize: false,
      ValueSetName: undefined,
      TestScenarioInfo: undefined,
      Steps: [
        {
          Index: 1,
          Name: 'Step 1',
          StepType: ApiTestStepExecutionStepType.Step,
          Status: stepStatus,
        },
      ],
      TestedVersion: undefined,
      ExecutionDuration: undefined,
      AttachedLabels: undefined,
      CustomFields: undefined,
      Attachments: undefined
    } as unknown as ApiTestExecutionNew;
  
    await client.create([executionData]);
    
  })