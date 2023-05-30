import * as deploymentCommands from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, commonlyUsedCCCompanyWorksite, leobotReportTest, r3ReportInputInfo, rexReportInputInfo, userFirstNameDeployment } from '../../../../support/Region Constants/constants.js'
import { reportsUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as spreadSheets from '../../../../support/Automation Tests Commands/Report Commands/spreadsheetsCommands.js'


context('Reports tests (Spreadsheets)', () => {
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
                spreadSheets.spreadsheetsBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it("Verify there are no LeoBots shown in the drop down menu when no worksite is selected", () => {
                spreadSheets.noWorksiteNoLeobots()
            })
            it("Input worksite, Leobot and month with report, download the spreadsheet and csv and verify successful api call and file download", () => {
                spreadSheets.downloadSpreadsheetReportWithWorksiteRobotMonthInputLeobot()
            })
            it("Input R3 and month with report, download the spreadsheet and csv, verify successful api call and file download", () => {
                spreadSheets.downloadSpreadsheetReportWithWorksiteRobotMonthInputR3()
            })
            it("Input Rex and month with report, download the spreadsheet and csv and verify successful api call and file download", () => {
                spreadSheets.downloadSpreadsheetReportWithWorksiteRobotMonthInputRex()
            })
            it("Verify the input box content do not remain after page refresh", () => {
                spreadSheets.spreadsheetInputDoNotRemainAfteRefresh(user.role)
            })
            // CC users cannot run this test due to privileges
            if (!/CC/.test(user.role)) {
                it("(Excluding CC) Input company, worksite, robot(any) and month, download the spreadsheet and csv and verify successful api call and file download", () => {
                    spreadSheets.downloadSpreadsheetReportWithCompanyWorksiteRobotMonthInput(user.role)
                })
            }
        })
    })
})
