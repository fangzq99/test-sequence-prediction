import * as deploymentRex from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, rexDeploymentSearch, rexDeploymentSearchList } from '../../../../support/Region Constants/constants.js'
import { deploymentUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Deployments tests (Rex)', () => {
    deploymentUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                deploymentRex.deploymentCommandsBeforeEach(baseURL, user.username, user.password)
            })
            it("Rex can be deployed without selecting users while selecting worksite", () => {
                deploymentRex.withWorksiteWithCompanyNoUsersCanDeploy(rexDeploymentSearch)
            })
        })
    })
})
