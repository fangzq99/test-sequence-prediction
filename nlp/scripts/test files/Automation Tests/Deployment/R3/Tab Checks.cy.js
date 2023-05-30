import * as deploymentR3 from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, r3DeploymentSearch, r3DeploymentSearchList } from '../../../../support/Region Constants/constants.js'
import { deploymentUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Deployments tests (R3)', () => {
    deploymentUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                deploymentR3.deploymentCommandsBeforeEach(baseURL, user.username, user.password)
            })
            it('Search and select R3 without selecting company and worksite', () => {
                deploymentR3.selectRobotTab(r3DeploymentSearchList, r3DeploymentSearch)
            })
            it('Search and select R3, then search and select worksite', () => {
                deploymentR3.selectSearchWorksiteTab(r3DeploymentSearch)
            })
        })
    })
})
