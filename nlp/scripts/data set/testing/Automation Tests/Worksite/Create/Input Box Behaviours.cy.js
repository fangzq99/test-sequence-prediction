import { baseURL } from '../../../../support/Region Constants/constants.js'
import { worksiteCreateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as worksiteCreate from '../../../../support/Automation Tests Commands/Worksite Commands/worksiteCreateCommands.js'


// Not all users that can create worksites can delete worksites, only super admin and technicians can delete worksites
context('Worksite tests (Create)', () => {
    worksiteCreateUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteCreate.worksiteCreateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Validate the input box behaviours', () => {
                worksiteCreate.inputBoxBehaviours()
            })
        })
    })
})

