import * as worksiteView from '../../../../support/Automation Tests Commands/Worksite Commands/worksiteViewCommands.js'
import { baseURL } from '../../../../support/Region Constants/constants.js'
import { worksiteViewUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Worksite tests (View)', () => {
    worksiteViewUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteView.worksiteViewBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it("*  check the ascending ordering", { retries: 0 }, () => {
                worksiteView.worksitePageAscendingOrder()
            })
            it("* check the descending ordering", { retries: 0 }, () => {
                worksiteView.worksitePageDescendingOrder()
            })
        })
    })
})

