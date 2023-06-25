import * as deploymentLeoBot from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, leobotsDeploymentSearch, leobotsDeploymentSearchList } from '../../../../support/Region Constants/constants.js'
import { deploymentUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Deployment tests (LeoBot)', () => {
    deploymentUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                deploymentLeoBot.deploymentCommandsBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('complete valid deployment, check the headers contain all the correct reflect data at each stage, we assert all users added contain value of UserDeployments constant', () => {
                deploymentLeoBot.completeValidDeployment([leobotsDeploymentSearch])
            })
        })
    })
})
