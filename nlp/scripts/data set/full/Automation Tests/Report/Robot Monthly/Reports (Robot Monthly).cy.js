import * as deploymentCommands from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, commonlyUsedCCCompanyWorksite, leobotReportTest, r3ReportInputInfo, rexReportInputInfo, userFirstNameDeployment } from '../../../../support/Region Constants/constants.js'
import { reportsUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as monthlyReports from '../../../../support/Automation Tests Commands/Report Commands/monthlyReportsCommands.js'


context('Reports tests (Monthly Reports)', () => {
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
            // put 3277 into validation worksite
            beforeEach(() => {
                // CC have different view
                monthlyReports.monthlyBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Verify "Download Report" button is disabled by default and the correct empty PDF frame is shown', () => {
                monthlyReports.defaultMonthlyReportPage()
            })
            it("Input worksite and robot, and select a month without a monthly report for the leobot, assert the download button is disabled and PDF empty frame is correct", () => {
                monthlyReports.robotWithoutMonthlyReport()
            })
            it("Input worksite and Leobot, and select a month with monthly report for the leobot, assert the download button is enabled", () => {
                monthlyReports.downloadMonthlyReportWithWorksiteRobotMonthInputLeobot()
            })
            it("Input Leobot and month with report, download the first report and verify successful api call", () => {
                monthlyReports.downloadMonthlyReportWithRobotMonthInputLeobot()
            })
            it("Input R3 and month with report, download the first report and verify successful api call", () => {
                monthlyReports.downloadMonthlyReportWithRobotMonthInputR3()
            })
            it("Input Rex and month with report, download the first report and verify successful api call", () => {
                monthlyReports.downloadMonthlyReportWithRobotMonthInputRex()
            })
            it("Verify the input box content do not remain after page refresh", () => {
                monthlyReports.robotMonthlyInputDoNotRemainAfteRefresh(user.role)
            })
            it("Input robot and verify download button is enabled, then input worksite and verify that the robot input is cleared upon worksite input and button is disabled, and verify the correct company is auto completed", () => {
                monthlyReports.robotMonthlyRobotInputDoNotRemainAfterChangingWorksiteInput(user.role)
            })
            // CC users cannot run this test due to privileges
            if (!/CC/.test(user.role)) {
                it("(Excluding CC) Input company, worksite, robot and month, download the first report and verify successful api call", () => {
                    monthlyReports.downloadMonthlyReportWithCompanyWorksiteRobotMonthInput(user.role)
                })
                // REMOVE THIS LATER BECAUSE IT IS CHECKED INSIDE .monthlyReportInputBoxBehaviours()
                it("(Excluding CC) Company input should auto complete after entering the worksite", () => {
                    monthlyReports.robotMonthlyWorksiteInputAutoCompleteCompany(user.role)
                })
            }
        })
    })
})
