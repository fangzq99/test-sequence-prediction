import { baseURL, userCleaner, userSupervisor } from '../../../../support/Region Constants/constants.js'
import { userUpdateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as userUpdate from '../../../../support/Automation Tests Commands/User Commands/userUpdateCommands.js'
import * as userCreate from '../../../../support/Automation Tests Commands/User Commands/userCreateCommands.js'


context('User tests (Update)', () => {
    userUpdateUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                userUpdate.userUpdateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it("search for validation user, click on user, inspect user, click edit and check edit modal error messages", () => {
                userUpdate.validateEditUserErr()
            })
        })
    })
})

