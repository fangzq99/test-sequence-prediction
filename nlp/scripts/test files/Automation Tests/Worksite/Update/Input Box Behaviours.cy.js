import { baseURL } from '../../../../support/Region Constants/constants.js'
import { worksiteUpdateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as worksiteUpdate from '../../../../support/Automation Tests Commands/Worksite Commands/worksiteUpdateCommands.js'


context('Worksite tests (Update)', () => {
    worksiteUpdateUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteUpdate.worksiteUpdateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Validate the input box behaviours', () => {
                worksiteUpdate.inputBoxBehaviours()
            })
        })
    })
})



