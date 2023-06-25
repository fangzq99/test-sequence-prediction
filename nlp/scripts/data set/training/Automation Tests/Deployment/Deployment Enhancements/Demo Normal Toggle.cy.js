import * as deploymentEnhancement from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentEnhancementsCommands.js'
import { baseURL } from '../../../../support/Region Constants/constants.js'
import { loginParent } from '../../../../support/generalCommands.js'
import { deploymentEnhancementUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Deployment enhancements tests (Demo site function, normal to demo)', () => {
    before(() => {
        deploymentEnhancement.deployToDemoSiteNorm()
    })
    deploymentEnhancementUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                loginParent(baseURL, user.username, user.password)
            })
            it('toggle demoSite and check that all the users are removed', () => {
                deploymentEnhancement.toggleDemoSite()
            })
        })
    })
})


