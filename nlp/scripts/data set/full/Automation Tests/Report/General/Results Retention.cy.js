import * as deploymentCommands from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, commonlyUsedCCCompanyWorksite, commonlyUsedCCCompanyWorksite2, r3ReportInputInfo } from '../../../../support/Region Constants/constants.js'
import { reportsUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as reportsGeneral from '../../../../support/Automation Tests Commands/Report Commands/reportsGeneralCommands.js'


context('Reports tests (Results from different company and worksite do not carry over)', () => {
    reportsUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                cy.task('log', '\nSet up by redeploying test robot to main company and worksite with report, then check and ensure that there are reports in the current worksite')
                deploymentCommands.redeployRobotAsSuperAdmin({
                    companyName: commonlyUsedCCCompanyWorksite['companyName'],
                    worksiteName: commonlyUsedCCCompanyWorksite['worksiteName'],
                    targetRobots: [r3ReportInputInfo['robotName']],
                    assignUserTerm: ''
                })
                // CC have different view
                reportsGeneral.reportsGeneralBeforeEach(baseURL, user.username, user.password, user.role)
                // CC have different procedures 
                reportsGeneral.companyWorksiteFilterHasReports({
                    companyName: commonlyUsedCCCompanyWorksite['companyName'],
                    worksiteName: commonlyUsedCCCompanyWorksite['worksiteName'],
                    targetRobot: r3ReportInputInfo['robotName'],
                    month: r3ReportInputInfo['reportMonth'],
                    role: user.role
                })
            })
            it('Move the test robot to another worksite under the same company but with no reports, then check that reports from the previous worksite did not carry over', () => {
                deploymentCommands.redeployRobotAsSuperAdmin({
                    companyName: commonlyUsedCCCompanyWorksite['companyName'],
                    worksiteName: commonlyUsedCCCompanyWorksite['worksite2Name'],
                    targetRobots: [r3ReportInputInfo['robotName']],
                    assignUserTerm: ''
                })
                // CC have different view
                reportsGeneral.reportsGeneralBeforeEach(baseURL, user.username, user.password, user.role)
                // CC have different procedures
                reportsGeneral.companyWorksiteFilterNoReports({
                    companyName: commonlyUsedCCCompanyWorksite['companyName'],
                    worksiteName: commonlyUsedCCCompanyWorksite['worksite2Name'],
                    targetRobot: r3ReportInputInfo['robotName'],
                    month: r3ReportInputInfo['reportMonth'],
                    role: user.role
                })
            })
            // CC users cannot run this test due to not able to select company
            if (!/CC/.test(user.role)) {
                it('(Excluding CC) Move the test robot to another company but with no reports, then check that reports from the previous comapny did not carry over', () => {
                    // deploymentCommands.redeployRobotAsSuperAdmin(reportTestCompany2, reportTestWorksite2, reportRobotSN)
                    deploymentCommands.redeployRobotAsSuperAdmin({
                        companyName: commonlyUsedCCCompanyWorksite2['companyName'],
                        worksiteName: commonlyUsedCCCompanyWorksite2['worksiteName'],
                        targetRobots: [r3ReportInputInfo['robotName']],
                        assignUserTerm: ''
                    })
                    // CC have different view
                    reportsGeneral.reportsGeneralBeforeEach(baseURL, user.username, user.password, user.role)
                    // CC have different procedures
                    reportsGeneral.companyWorksiteFilterNoReports({
                        companyName: commonlyUsedCCCompanyWorksite2['companyName'],
                        worksiteName: commonlyUsedCCCompanyWorksite2['worksiteName'],
                        targetRobot: r3ReportInputInfo['robotName'],
                        month: r3ReportInputInfo['reportMonth'],
                        role: user.role
                    })
                })
            }
        })
    })
})
