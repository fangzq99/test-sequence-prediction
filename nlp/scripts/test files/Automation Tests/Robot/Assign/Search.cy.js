import * as robotAssign from '../../../../support/Automation Tests Commands/Robot Commands/robotAssignCommands.js'
import { assignUsersSearchTerms, baseURL } from '../../../../support/Region Constants/constants.js'
import { robotAssignUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Robot tests (Assign)', () => {
    robotAssignUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotAssign.robotAssignBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Assign users page search filter', () => {
                robotAssign.searchFilter(assignUsersSearchTerms)
            })
        })
    })
})
