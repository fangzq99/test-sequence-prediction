import { baseURL } from '../../../../support/Region Constants/constants.js'
import { userCreateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as userCreate from '../../../../support/Automation Tests Commands/User Commands/userCreateCommands.js'


context('User tests (Create)', () => {
    userCreateUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                userCreate.userCreateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it.skip('Under Validation Company, create supervisor admin and cleaner PART 1 DO NOT RUN WITHOUT PART 2', () => {
                userCreate.validateCreateUsersPart1()
            })
            if (/tech/i.test(user.role)) {
                it.skip('search for our custom created stuff in the previous test, edit and dont save, edit and save and delete PART2 DO NOT RUN WITHOUT PART 1', () => {
                    userCreate.validateEditDeleteUserPart2()
                })
            }
            it.skip('reset password', () => {
                userCreate.checkResetPassword()
            })
            it.skip('create cleaner do not need email', () => {
                userCreate.createCleanerNoEmail()
            })
            it.skip('create super do not need email', () => {
                userCreate.createCleanerNoEmail(true)
            })
            if (/super admin/i.test(user.role)) {
                it('(Only Non-LB Admin) create user form, test roles selection, cannot select openapi with other roles, does not create user, only checks create user form', () => {
                    userCreate.userCreateRoleSelection('lb level')
                })
            }
            else {
                it('create user form, test roles selection, cannot select openapi with other roles, does not create user, only checks create user form', () => {
                    userCreate.userCreateRoleSelection()
                })
            }
        })
    })
})

