import * as robotView from '../../../../support/Automation Tests Commands/Robot Commands/robotViewCommands.js'
import { baseURL } from '../../../../support/Region Constants/constants.js'
import { robotViewUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Robot tests (View)', () => {
    robotViewUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotView.robotViewBeforeEach(baseURL, user.username, user.password, user.role)
            })
            // Dont understand where does the difference come from for the different roles, need an overhaul.
            // Also, this section is subject to heavy changes depending on the Autonomy team's equalizer config
            // yaml file upload. Needs to not only rework this section, but need to rework the equalizer
            // config modes with the constants to be used as well
            // Disabling this test due to flakiness and Autonomy team's mood.
            // Detailed view section
            if (/super admin/i.test(user.role)) {
                it.skip("fully populated bot", () => {
                    robotView.detailedView()
                })
            }
            else if (/CC/.test(user.role)) {
                it.skip("fully populated bot", () => {
                    robotView.detailedView('no other tab', 'no personality controls')
                })
            }
            else {
                it.skip("fully populated bot", () => {
                    robotView.detailedView('no other tab')
                })
            }
            it.skip("report short cuts", () => {
                robotView.reportsBtns()
            })
        })
    })
})
