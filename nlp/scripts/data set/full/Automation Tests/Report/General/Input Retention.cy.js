import { baseURL } from '../../../../support/Region Constants/constants.js'
import { reportsUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as reportsGeneral from '../../../../support/Automation Tests Commands/Report Commands/reportsGeneralCommands.js'



context('Reports tests (Search input retention)', () => {
    reportsUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                // CC have different view
                reportsGeneral.reportsGeneralBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Input cleaning job details on cleaning jobs page, switch in this order Cleaning Jobs -> Monthly Report -> Spreadsheets -> Worksite Monthly -> Fleet Monthly, and ensure that the search input remains in the relevant search box', () => {
                reportsGeneral.retainSearchCleaningJobsToRMToSSToWMToFM(user.role)
            })
            it('Input cleaning job details on cleaning jobs page, switch in this order Cleaning Jobs -> Monthly Report -> Spreadsheets -> Worksite Monthly -> Fleet Monthly, then switch back to Cleaning Jobs, Robot Monthly and Spreadsheets and ensure the input are still there', () => {
                reportsGeneral.retainCleaningJobsInputAfterSwitchBackFromRMToSSToWMToFM(user.role)
            })
        })
    })
})



