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
            it("*  test search filter input 000000000 and check for no data", () => {
                userView.filterNoData()
            })
            it("search term and check for search term", () => {
                userView.filterSearchTerm()
            })
        })
    })
})


