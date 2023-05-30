import * as robotUpdateConfig from '../../../../../support/Automation Tests Commands/Robot Commands/robotUpdateConfigCommands.js'
import { baseURL, commonlyUsedRobots } from '../../../../../support/Region Constants/constants.js'
import { robotUpdateConfigsUsers } from '../../../../../support/Region Constants/userPrivileges.js'


context('Robot tests (Update configs)(R3)', () => {
    robotUpdateConfigsUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotUpdateConfig.robotUpdateBeforeEach(baseURL, user.username, user.password, user.role, commonlyUsedRobots['r3']['592'])
            })
            it("r3 configuration testing, update a setting, save it and record it as variable, check notification and api call, switch another tab and return and check if setting value matches variable", () => {
                robotUpdateConfig.configCardTest(user.role)
            })
        })
    })
})
