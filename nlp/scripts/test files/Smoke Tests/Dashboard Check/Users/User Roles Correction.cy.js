import { baseURL } from "../../../../support/Region Constants/constants.js"
import { userStatusUsers } from "../../../../support/Region Constants/userPrivilegesSmokeTests"
import * as userStatus from '../../../../support/Smoke Tests Commands/Dashboard Check Commands/userStatusCommands.js'


context('User role for the desired user exist for region: ' + baseURL, () => {
    userStatusUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                userStatus.userStatusBeforeEach(user.username, user.password, user.role)
            })
            it('Search for all users and ensure their roles are correct', () => {
                userStatus.verifyUserRoles(user.role)
            })
        })
    })
})