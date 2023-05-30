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
            it('check error message for illegal image on edit user', () => {
                userUpdate.illegalImageEditUser()
            })
        })
    })
})

