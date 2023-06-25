import { baseURL, robotSearchPageStates } from '../../../../support/Region Constants/constants.js'
import { paginationTest } from '../../../../support/generalCommands.js'
import { robotViewUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as robotView from '../../../../support/Automation Tests Commands/Robot Commands/robotViewCommands.js'


context('Robot tests (View)', () => {
    robotViewUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotView.robotViewBeforeEach(baseURL, user.username, user.password, user.role)
            })
            // NOTE: The retries when in dashboard headless mode is set to 0
            // because it takes REALLY long to run and retrying it can take up to ~2 hours
            // which is a massive waste of both CICD and dashboard minutes.
            // But the GUI mode is set to 2 because no minutes are involved so just retry it
            //
            // FIX: Known issue with offline scam state and scam card status background color
            it("Validate background color of all the states", {
                retries: {
                    runMode: 0,
                    openMode: 2,
                },
            }, () => {
                robotView.filterStateColour(robotSearchPageStates)
            })
        })
    })
})
