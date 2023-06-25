import * as deploymentCommands from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import * as worksitesMonthly from '../../../../support/Automation Tests Commands/Report Commands/worksitesMonthlyCommands.js'
import { baseURL, commonlyUsedCCCompanyWorksite, leobotReportTest, userFirstNameDeployment } from '../../../../support/Region Constants/constants.js'
import { reportsUsers } from '../../../../support/Region Constants/userPrivileges.js'



context('Reports tests (Worksites Monthly)', () => {
    // NOTE: Probably no need to deploy robots for worksites monthly tests because it does not concern
    // robots? Will need to revise this before hook so as to reduce unneccessary test set up procedures
    before(() => {
        deploymentCommands.redeployRobotAsSuperAdmin({
            companyName: commonlyUsedCCCompanyWorksite['companyName'],
            worksiteName: commonlyUsedCCCompanyWorksite['worksiteName'],
            targetRobots: [leobotReportTest['robotName']],
            assignUserTerm: userFirstNameDeployment
        })
    })
    reportsUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksitesMonthly.worksitesMonthlyBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Input worksite and month, no detailed cleaning history, download the report and verify successful api call and file download', () => {
                worksitesMonthly.downloadWorksiteMonthlyWithWorksiteMonthNoDetailedHistory()
            })
            it('Input only worksite, no detailed cleaning history, download the report and verify successful api call and file download', () => {
                worksitesMonthly.downloadWorksiteMonthlyWithWorksiteNoDetailedHistory()
            })
            it('Input worksite and month, check detailed cleaning history box, download the report and verify successful api call and file download', () => {
                worksitesMonthly.downloadWorksiteMonthlyWithWorksiteMonthDetailedHistory()
            })
            it("Verify the input box content do not remain after page refresh", () => {
                worksitesMonthly.worksitesMonthlyInputDoNotRemainAfteRefresh(user.role)
            })
            // CC users cannot run this test due to privileges
            if (!/CC/.test(user.role)) {
                it('(Excluding CC) Input company, worksite and month, download the report and verify successful api call and file download', () => {
                    worksitesMonthly.downloadWorksiteMonthlyWithCompanyWorksiteMonthNoDetailedHistory(user.role)
                })
                it('(Excluding CC) Input company, worksite and month, download the report and verify successful api call and file download', () => {
                    worksitesMonthly.downloadWorksiteMonthlyWithCompanyWorksiteMonthDetailedHistory(user.role)
                })
                it('(Excluding CC) Input only worksite, verify the worksite company is automatically filled in in the company input', () => {
                    worksitesMonthly.worksiteInputAutoCompleteCompany(user.role)
                })
                it("(Excluding CC) Input worksite and verify download button is enabled, then input company and verify that the worksite input is cleared upon company input and button is disabled, and verify the correct company is auto completed", () => {
                    worksitesMonthly.worksitesMonthlyWorksiteInputDoNotRemainAfterChangingCompanyInput(user.role)
                })
            }
        })
    })
})
