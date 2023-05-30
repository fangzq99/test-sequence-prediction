import * as deploymentLeoBot from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, leobotsDeploymentSearch, leobotsDeploymentSearchList } from '../../../../support/Region Constants/constants.js'
import { deploymentUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Deployment tests (LeoBot)', () => {
    deploymentUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                deploymentLeoBot.deploymentCommandsBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Leobot Deployment check no robots, no company, no worksite', () => {
                deploymentLeoBot.robotWorksiteCompanyUsersTabState()
            })
            it('Leobot Deployment robot search and select robot,with no company, no worksite', () => {
                deploymentLeoBot.selectRobotTab(leobotsDeploymentSearchList, leobotsDeploymentSearch)
            })
            it('Leobot Deployment select worksite and search worksite and cannot select users with no worksite', () => {
                deploymentLeoBot.selectSearchWorksiteTab(leobotsDeploymentSearch)
            })
        })
    })
})
