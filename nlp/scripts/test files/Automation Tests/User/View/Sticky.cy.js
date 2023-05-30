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
            it('sticky details, more, search elements', () => {
                userView.sticky()
            })
            it('not sticky statistics, elements', () => {
                userView.notSticky()
            })
        })
    })
})


