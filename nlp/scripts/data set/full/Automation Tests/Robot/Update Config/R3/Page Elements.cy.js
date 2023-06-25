import * as robotUpdateConfig from '../../../../../support/Automation Tests Commands/Robot Commands/robotUpdateConfigCommands.js'
import { baseURL, commonlyUsedRobots } from '../../../../../support/Region Constants/constants.js'
import { robotUpdateConfigsUsers } from '../../../../../support/Region Constants/userPrivileges.js'


context('Robot tests (Update configs)(R3)', () => {
    robotUpdateConfigsUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotUpdateConfig.robotUpdateBeforeEach(baseURL, user.username, user.password, user.role, commonlyUsedRobots['r3']['592'])
            })
            it('Validate R3 page elements', () => {
                robotUpdateConfig.robotPageElements(commonlyUsedRobots['r3']['592'], user.role)
            })
        })
    })
})
