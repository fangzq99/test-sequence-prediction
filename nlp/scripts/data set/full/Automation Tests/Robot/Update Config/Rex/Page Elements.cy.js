import * as robotUpdateConfig from '../../../../../support/Automation Tests Commands/Robot Commands/robotUpdateConfigCommands.js'
import { baseURL, commonlyUsedRobots } from '../../../../../support/Region Constants/constants.js'
import { robotUpdateConfigsUsers } from '../../../../../support/Region Constants/userPrivileges.js'


context('Robot tests (Update configs)(Rex)', () => {
    robotUpdateConfigsUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotUpdateConfig.robotUpdateBeforeEach(baseURL, user.username, user.password, user.role, commonlyUsedRobots['rex']['100'])
            })
            it('Validate Rex page elements', () => {
                robotUpdateConfig.robotPageElements(commonlyUsedRobots['rex']['100'], user.role)
            })
        })
    })
})
