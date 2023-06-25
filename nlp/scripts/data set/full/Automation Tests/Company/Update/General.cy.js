import { baseURL } from '../../../../support/Region Constants/constants.js'
import { companyUpdateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as companyUpdate from '../../../../support/Automation Tests Commands/Company Commands/companyUpdateCommands.js'


context('Company tests (Update)', () => {
    companyUpdateUsers.forEach((user) => {
        context(user.role, () => {
            beforeEach(() => {
                companyUpdate.companyUpdateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            if (/CC/.test(user.role)) {
                it("(Only CC) check company detailed view", () => {
                    companyUpdate.companyViewCC()
                })
                it("(Only CC) update and cancel update and save", () => {
                    companyUpdate.editCompanyInCC()
                })
            }
            else if (!/CC/.test(user.role)) {
                it('(Excluding CC) check that update form will reject field inputs with only whitespace, for name, name on app, unique number, street address', () => {
                    companyUpdate.companyUpdateNoWhiteSpaces()
                })
                it('(Excluding CC) check that create form will reject field inputs with only whitespace, for name,name on app, unique number, street address', () => {
                    companyUpdate.companyCreateNoWhiteSpaces()
                })
            }
        })
    })
})

