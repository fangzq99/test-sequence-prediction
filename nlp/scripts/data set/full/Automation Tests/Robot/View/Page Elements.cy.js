import { baseURL, robotSearchPageStates } from '../../../../support/Region Constants/constants.js'
import { paginationTest } from '../../../../support/generalCommands.js'
import { robotViewUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as robotView from '../../../../support/Automation Tests Commands/Robot Commands/robotViewCommands.js'


context('Robot tests (View)', () => {
    robotViewUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotView.robotViewBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Validate robot page elements', () => {
                robotView.observeRobotPageElements(user.role)
            })
        })
    })
})
