import { baseURL, commonlyUsedRobots } from "../../../../support/Region Constants/constants.js"
import { robotStatusUsers } from "../../../../support/Region Constants/userPrivilegesSmokeTests"
import * as robotStatus from '../../../../support/Smoke Tests Commands/Dashboard Check Commands/robotStatusCommands.js'


context('Robot exist in search for region: ' + baseURL, () => {
    robotStatusUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotStatus.robotStatusBeforeEach(user.username, user.password, user.role)
            })
            it('Search for all test robots on robots page and ensure they exists', () => {
                robotStatus.verifyRobotName(user.role, [commonlyUsedRobots['leoBot']['57'], commonlyUsedRobots['r3']['592'], commonlyUsedRobots['rex']['100']])
            })
        })
    })
})