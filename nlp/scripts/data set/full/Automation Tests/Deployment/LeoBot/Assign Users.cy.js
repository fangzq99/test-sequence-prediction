import * as deploymentLeoBot from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, leobotsDeploymentSearch } from '../../../../support/Region Constants/constants.js'
import { deploymentUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Deployment tests (LeoBot)', () => {
    deploymentUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                deploymentLeoBot.deploymentCommandsBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it("Assign user, search test, select all", () => {
                deploymentLeoBot.assignUsersToRobot([leobotsDeploymentSearch])
            })
        })
    })
})
