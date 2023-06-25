import { baseURL } from '../../../../support/Region Constants/constants.js'
import { companyUpdateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as companyUpdate from '../../../../support/Automation Tests Commands/Company Commands/companyUpdateCommands.js'


context('Company tests (Update)', () => {
    companyUpdateUsers.forEach((user) => {
        context(user.role, () => {
            beforeEach(() => {
                companyUpdate.companyUpdateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it("update illegal img", () => {
                companyUpdate.editCompanyIllegalImgErr(user.role)
            })
        })
    })
})

