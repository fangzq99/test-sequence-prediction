import { baseURL } from '../../../../support/Region Constants/constants.js'
import { companyUpdateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as companyUpdate from '../../../../support/Automation Tests Commands/Company Commands/companyUpdateCommands.js'


context('Company tests (Update)', () => {
    companyUpdateUsers.forEach((user) => {
        context(user.role, () => {
            beforeEach(() => {
                companyUpdate.companyUpdateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it("update err msg", () => {
                companyUpdate.searchEditCompanyErr(user.role)
            })
            it('check that update form will reject field inputs with only whitespace, for name, name on app, unique number, street address', () => {
                companyUpdate.companyUpdateNoWhiteSpaces(user.role)
            })
        })
    })
})

