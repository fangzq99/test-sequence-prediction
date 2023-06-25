import * as deploymentLeoBot from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, leobotsDeploymentSearch, leobotsDeploymentSearchList } from '../../../../support/Region Constants/constants.js'
import { deploymentUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Deployment tests (LeoBot)', () => {
    deploymentUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                deploymentLeoBot.deploymentCommandsBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it("Search and select LeoBot, then select worksite, without selecting company and remove all users assigned, then check the error message", () => {
                deploymentLeoBot.withWorksiteNoCompanyNoUsersCannotDeployLeoBot()
            })
        })
    })
})
