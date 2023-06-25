import { baseURL } from '../../../../support/Region Constants/constants.js'
import { worksiteDeleteUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as worksiteDelete from '../../../../support/Automation Tests Commands/Worksite Commands/worksiteDeleteCommands.js'


context('Worksite tests (Delete)', () => {
    worksiteDeleteUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteDelete.worksiteDeleteBeforeEach(baseURL, user.username, user.password)
            })
            it('create AutoGenWorksite lifts and demo set false with superadmin for delete the test PART 1', () => {
                worksiteDelete.createWorksiteForDeletePart1()
            })
            it('delete an I am AutoGenWorksite PART2', () => {
                worksiteDelete.createWorksiteForDeletePart2()
            })
        })
    })
})

