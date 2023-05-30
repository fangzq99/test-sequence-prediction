import { baseURL } from '../../../../support/Region Constants/constants.js'
import { robotDeleteUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as robotDelete from '../../../../support/Automation Tests Commands/Robot Commands/robotDeleteCommands.js'


context('Robot tests (Create)', () => {
    robotDeleteUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotDelete.robotDeleteBeforeEach(baseURL, user.username, user.password)
            })
            it("Delete auto generated robots as super admin", () => {
                robotDelete.deleteRobots()
            })
        })
    })
})