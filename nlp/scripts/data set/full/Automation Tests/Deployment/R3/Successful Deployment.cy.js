import * as deploymentR3 from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, r3DeploymentSearch, r3DeploymentSearchList } from '../../../../support/Region Constants/constants.js'
import { deploymentUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Deployments tests (R3)', () => {
    deploymentUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                deploymentR3.deploymentCommandsBeforeEach(baseURL, user.username, user.password)
            })
            it('Complete valid R3 deployment, check the headers contain all the correct reflect data at each stage, verify all users are added and each contain the value of UserDeployments constant', () => {
                deploymentR3.completeValidDeployment(r3DeploymentSearch)
            })
        })
    })
})
