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
            it('* and * next and prev page and select page', () => {
                paginationTest
            })
            if (/sales/i.test(user.role) || /tech/i.test(user.role) || /\bSuper Administrator\b/i.test(user.role)) {
                it('(Only Sales, Tech and Super Admin) dropdown menu items check', () => {
                    userView.checkRolesMenuList(user.role)
                })
            }
            if (/sales/i.test(user.role)) {
                it("(Only Sales) search for validation, click on user, inspect user, no edit or delete user button", () => {
                    userView.searchInspectUserNoEditDelete()
                })
            }
            else if (/standard/i.test(user.role) || /\bAdmin\b/i.test(user.role)) {
                it("(Only Standard and Non-LB Admin) search for validation, click on user, inspect user, no create or edit user button", () => {
                    userView.searchInspectUserNoCreateEditDelete()
                })
            }
        })
    })
})


