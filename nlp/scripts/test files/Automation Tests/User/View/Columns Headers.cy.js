import { baseURL } from '../../../../support/Region Constants/constants.js'
import { paginationTest } from '../../../../support/generalCommands.js'
import { userViewUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as userView from '../../../../support/Automation Tests Commands/User Commands/userViewCommands.js'


context('User tests (View)', () => {
    userViewUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                userView.userViewBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it("validate the columns of Details and More", () => {
                userView.columnHeaders(user.role)
            })
        })
    })
})


