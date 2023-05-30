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
            it('* and * next and prev page and select page', () => {
                paginationTest
            })
        })
    })
})


