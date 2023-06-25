import { baseURL } from '../../../../support/Region Constants/constants.js'
import { paginationTest } from '../../../../support/generalCommands.js'
import { companyCreateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as companyCreate from '../../../../support/Automation Tests Commands/Company Commands/companyCreateCommands.js'


context('Company tests (Create)', () => {
    companyCreateUsers.forEach((user) => {
        context(user.role, () => {
            beforeEach(() => {
                companyCreate.companyCreateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Create company but with valid and invalid image files inputs, then check the error messages shown', () => {
                companyCreate.createCompanyIllegalImageError()
            })
            it.only('Create company but with invalid inputs, click "Save" then check the error messages shown', () => {
                companyCreate.createCompanyFormErrorMsg(user.role)
            })
            it('Create company but with whitespace inputs, click "Save" then check the error messages shown for name, name on app, unique number, street address', () => {
                companyCreate.companyCreateNoWhiteSpaces()
            })
        })
    })
})


