import * as deploymentCommands from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js'
import { baseURL, commonlyUsedCCCompanyWorksite, leobotReportTest, r3ReportInputInfo, rexReportInputInfo, userFirstNameDeployment } from '../../../../support/Region Constants/constants.js'
import { reportsUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as cleaningJobs from '../../../../support/Automation Tests Commands/Report Commands/cleaningJobsCommands.js'



context('Reports tests (Cleaning Jobs)', () => {
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
                // CC have different view
                cleaningJobs.cleaningJobsBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Verify "Download Report" button is disabled by default and the empty PDF message in the container is shown', () => {
                cleaningJobs.defaultMonthlyReportPage()
            })
            it("Input worksite, robot and month, then select first report shown, assert API call, download the report then verify the report has been downloaded", () => {
                cleaningJobs.downloadCleaningJobReportWithWorksiteRobotMonth()
            })
            it("Input LeoBot and month, then select first report shown, assert API call, download the report then verify the report has been downloaded", () => {
                cleaningJobs.downloadCleaningJobReportWithRobotMonthLeoBot()
            })
            it("Input R3 and month, then select first report shown, assert API call, download the report then verify the report has been downloaded", () => {
                cleaningJobs.downloadCleaningJobReportWithRobotMonthR3()
            })
            it("Input Rex and month, then select first report shown, assert API call, download the report then verify the report has been downloaded", () => {
                cleaningJobs.downloadCleaningJobReportWithRobotMonthRex()
            })
            // NOTE: Work on this when have time
            // No way to check the tick and text right now due to the virtual scroll box quirks
            it.skip('Verify only reports <50% have text percentage while reports >50% have a tick', () => {
                cleaningJobs.verifyOnlyReportsBelow50HavePercentage()
            })
            it('Verify the cleaning job search function and the job report format', () => {
                cleaningJobs.jobReportSearchAndFormat()
            })
            it("Verify the input box content do not remain after page refresh", () => {
                cleaningJobs.cleaningJobsInputDoNotRemainAfteRefresh(user.role)
            })
            // CC have different procedures 
            if (!/CC/.test(user.role)) {
                it('(Excluding CC) Input company, worksite, robot and month but do not select any report, verify "Download Report" button is disabled and correct empty PDF frame', () => {
                    cleaningJobs.noDownloadCleaningJobReportWithCompanyWorksiteRobotMonth(user.role)
                })
                it("(Excluding CC) Input company, worksite, robot and month, download the first report, verify successful api call and file download", () => {
                    cleaningJobs.downloadCleaningJobReportWithCompanyWorksiteRobotMonth(user.role)
                })
            }
        })
    })
})

