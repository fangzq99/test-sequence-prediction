import * as deploymentRex from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, rexDeploymentSearch, rexDeploymentSearchList } from '../../../../support/Region Constants/constants.js'
import { deploymentUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Deployments tests (Rex)', () => {
    deploymentUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                deploymentRex.deploymentCommandsBeforeEach(baseURL, user.username, user.password)
            })
            it('Complete valid Rex deployment, check the headers contain all the correct reflect data at each stage, verify all users are added and each contain the value of UserDeployments constant', () => {
                deploymentRex.completeValidDeployment(rexDeploymentSearch)
            })
        })
    })
})
