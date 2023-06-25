import { baseURL } from '../../../../support/Region Constants/constants.js'
import { robotUpdateInfoUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as robotUpdateInfo from '../../../../support/Automation Tests Commands/Robot Commands/robotUpdateInfoCommands.js'


context('Robot tests (Update info)', () => {
    robotUpdateInfoUsers.forEach(user => {
        context(user.role, () => {
            if (/super admin/i.test(user.role)) {
                beforeEach(() => {
                    robotUpdateInfo.robotUpdateInfoBeforeEach(baseURL, user.username, user.password, user.role)
                })
                it("(Only Super Admin) edit modal check for elements * robot Tribe, family, type * calendar manufacturing date * Textfield for Serial Number * Switch, schedule Enable, schedule Robot brake, auto dock", () => {
                    robotUpdateInfo.findElements()
                })
                it("(Only Super Admin) Legit Serial Number", () => {
                    robotUpdateInfo.legitSerialNo()
                })
                it("(Only Super Admin) Empty Serial No", () => {
                    robotUpdateInfo.emptySerialNo()
                })
                it("(Only Super Admin) existing serial No", () => {
                    robotUpdateInfo.existingSerialNo()
                })
                it("(Only Super Admin) empty family and type and legit family and type", () => {
                    robotUpdateInfo.emptyFamilyTypeOrLegitFamilyType()
                })
            }
            else {
                it("Non LB Super Admin users cannot edit robot due to 'Edit' button not visible", () => {
                    robotUpdateInfo.noEditRobot(baseURL, user.username, user.password)
                })
                it("Assert no create button", () => {
                    robotUpdateInfo.noCreateRobot(baseURL, user.username, user.password)
                })
            }
        })
    })
})