import * as robotView from '../../../../support/Automation Tests Commands/Robot Commands/robotViewCommands.js'
import { baseURL } from '../../../../support/Region Constants/constants.js'
import { robotViewUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Robot tests (View)', () => {
    robotViewUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotView.robotViewBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it.skip("Validate the robot page descending ordering", () => {
                robotView.robotPageDescendingOrder()
            })
        })
    })
})
