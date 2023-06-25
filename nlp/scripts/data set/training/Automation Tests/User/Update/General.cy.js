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
            it('edit cleaner do not need email', () => {
                userUpdate.editCleanerNoEmail(userCleaner)
            })
            it('edit super do not need email', () => {
                userUpdate.editCleanerNoEmail(userSupervisor)
            })
            if (/super admin/i.test(user.role)) {
                it('(Only LB Admin) edit user, test roles selection, cannot select openapi with other roles', () => {
                    userCreate.userEditRoleSelection('lb level')
                })
            }
            else {
                it('edit user, test roles selection, cannot select openapi with other roles', () => {
                    userCreate.userEditRoleSelection()
                })
            }
        })
    })
})

