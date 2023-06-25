import * as deploymentRex from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, rexDeploymentSearch, rexDeploymentSearchList } from '../../../../support/Region Constants/constants.js'
import { deploymentUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Deployments tests (Rex)', () => {
    deploymentUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                deploymentRex.deploymentCommandsBeforeEach(baseURL, user.username, user.password)
            })
            it('Search and select Rex, then search and select worksite, in assign users page, search each role, select all users in that role then deselect them', () => {
                deploymentRex.assignUsersToRobot(rexDeploymentSearch)
            })
        })
    })
})
