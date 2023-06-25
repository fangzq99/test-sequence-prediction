import * as deploymentCommands from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import * as fleetMonthly from '../../../../support/Automation Tests Commands/Report Commands/fleetMonthlyCommands.js'
import { baseURL, commonlyUsedCCCompanyWorksite, leobotReportTest, r3ReportInputInfo, rexReportInputInfo, userFirstNameDeployment } from '../../../../support/Region Constants/constants.js'
import { reportsUsers } from '../../../../support/Region Constants/userPrivileges.js'



context('Reports tests (Fleet Monthly)', () => {
    // NOTE: Probably no need to deploy robots for fleet monthly tests because it does not concern
    // robots? Will need to revise this before hook so as to reduce unneccessary test set up procedures
    before(() => {
        deploymentCommands.redeployRobotAsSuperAdmin({
            companyName: commonlyUsedCCCompanyWorksite['companyName'],
            worksiteName: commonlyUsedCCCompanyWorksite['worksiteName'],
            targetRobots: [leobotReportTest['robotName'], r3ReportInputInfo['robotName'], rexReportInputInfo['robotName']],
            assignUserTerm: userFirstNameDeployment
        })
    })
    reportsUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                fleetMonthly.fleetMonthlyBeforeEach(baseURL, user.username, user.password, user.role)
            })
            if (!/CC/.test(user.role)) {
                it('Input company and month, download the report and verify successful api call and file download', () => {
                    fleetMonthly.downloadFleetMonthlyWithCompanyMonth(user.role)
                })
                it("Verify the input box content do not remain after page refresh", () => {
                    fleetMonthly.fleetMonthlyInputDoNotRemainAfteRefresh(user.role)
                })
            }
            // Only CC users can generate report without selecting anything because they only have one
            // input box which is the month, all the other users need to at least select the company to generate
            // the report
            else {
                it('(Only CC) Input month, download the report and verify successful api call and file download', () => {
                    fleetMonthly.downloadFleetMonthlyWithMonth(user.role)
                })
                it("Verify the input box content do not remain after page refresh", () => {
                    fleetMonthly.fleetMonthlyInputDoNotRemainAfteRefresh(user.role)
                })
            }
        })
    })
})        
