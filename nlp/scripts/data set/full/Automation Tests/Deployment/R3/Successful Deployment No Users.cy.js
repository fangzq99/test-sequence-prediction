import * as deploymentR3 from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, r3DeploymentSearch, r3DeploymentSearchList } from '../../../../support/Region Constants/constants.js'
import { deploymentUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Deployments tests (R3)', () => {
    deploymentUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                deploymentR3.deploymentCommandsBeforeEach(baseURL, user.username, user.password)
            })
            it("R3 can be deployed without selecting users while selecting worksite", () => {
                deploymentR3.withWorksiteWithCompanyNoUsersCanDeploy(r3DeploymentSearch)
            })
        })
    })
})
