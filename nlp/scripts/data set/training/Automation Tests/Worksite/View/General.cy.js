import { baseURL, paginationTest } from '../../../../support/Region Constants/constants.js'
import { worksiteViewUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as worksiteView from '../../../../support/Automation Tests Commands/Worksite Commands/worksiteViewCommands.js'


context('Worksite tests (View)', () => {
    worksiteViewUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteView.worksiteViewBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('* and * next and prev page and select page', () => {
                paginationTest
            })
            it('worksite details page, assert titles and api calls', () => {
                worksiteView.checkWorksiteDetails()
            })

        })
    })
})

