import { baseURL, paginationTest } from '../../../../support/Region Constants/constants.js'
import { worksiteViewUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as worksiteView from '../../../../support/Automation Tests Commands/Worksite Commands/worksiteViewCommands.js'


context('Worksite tests (View)', () => {
    worksiteViewUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteView.worksiteViewBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it("*  test search filter input 000000000 and check for no data", () => {
                worksiteView.searchFilterNoData()
            })
            it("search term and check for search term", () => {
                worksiteView.searchTermFilterFindData()
            })
        })
    })
})

