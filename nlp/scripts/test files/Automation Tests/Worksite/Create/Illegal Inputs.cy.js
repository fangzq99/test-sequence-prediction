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
            it('Create worksite but with invalid inputs, click "Save" then check the error messages shown', () => {
                worksiteCreate.createWorksiteFormErrorMsg()
            })
            it('Create worksite but with empty inputs, click "Save" then check the error messages shown', () => {
                worksiteCreate.emptyWorksiteInputErrorMsg()
            })
            it('Create worksite but with valid and invalid image files inputs, then check the error messages shown', () => {
                worksiteCreate.invalidCreateWorksiteImageErrorMsg()
            })
        })
    })
})

