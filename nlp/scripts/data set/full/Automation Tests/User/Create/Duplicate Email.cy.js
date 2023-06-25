import { baseURL } from '../../../../support/Region Constants/constants.js'
import { userCreateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as userCreate from '../../../../support/Automation Tests Commands/User Commands/userCreateCommands.js'


context('User tests (Create)', () => {
    userCreateUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                userCreate.userCreateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('create user check duplicate email', () => {
                userCreate.createUserDuplicateEmail()
            })
        })
    })
})

