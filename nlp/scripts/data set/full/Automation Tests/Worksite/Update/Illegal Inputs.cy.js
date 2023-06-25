import { baseURL } from '../../../../support/Region Constants/constants.js'
import { worksiteUpdateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as worksiteUpdate from '../../../../support/Automation Tests Commands/Worksite Commands/worksiteUpdateCommands.js'


context('Worksite tests (Update)', () => {
    worksiteUpdateUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteUpdate.worksiteUpdateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Update worksite but with white space as inputs for name, operating hours, state and street address, then check the error messages shown', () => {
                worksiteUpdate.updateWorksiteCannotWhitespace()
            })
            it('Update worksite but with valid and invalid image files inputs, then check the error messages shown', () => {
                worksiteUpdate.invalidUpdateWorksiteImageErrorMsg()
            })
            it('Update worksite but with invalid inputs, click "Save" then check the error messages shown', () => {
                worksiteUpdate.updateWorksiteFormErrorMsg()
            })
        })
    })
})



