import * as deploymentCommands from '../../../../support/Automation Tests Commands/Deployment Commands/deploymentCommands.js';
import { baseURL, commonlyUsedCCCompanyWorksite, leobotReportTest, r3ReportInputInfo, rexReportInputInfo, userFirstNameDeployment } from '../../../../support/Region Constants/constants.js';
import { reportsUsers } from '../../../../support/Region Constants/userPrivileges.js';
import * as cleaningJobs from '../../../../support/Automation Tests Commands/Report Commands/cleaningJobsCommands.js';

context('Reports tests (Cleaning Jobs)', () => {
  before(() => {
    deploymentCommands.redeployRobotAsSuperAdmin({
      companyName: commonlyUsedCCCompanyWorksite['companyName'],
      worksiteName: commonlyUsedCCCompanyWorksite['worksiteName'],
      targetRobots: [leobotReportTest['robotName'], r3ReportInputInfo['robotName'], rexReportInputInfo['robotName']],
      assignUserTerm: userFirstNameDeployment
    });
  });
  reportsUsers.forEach((user) => {
    context(user.role, () => {
      beforeEach(() => {
        // CC have different view
        cleaningJobs.cleaningJobsBeforeEach(baseURL, user.username, user.password, user.role);
      });
      it('I Me Verify "Download Report" button is disabled by default and the empty PDF message in the container is shown', () => {
        cleaningJobs.defaultMonthlyReportPage();
      });
      it('Input worksite, robot and month, then select first report shown, assert API call, download the report then verify the report has been downloaded', () => {
        cleaningJobs.downloadCleaningJobReportWithWorksiteRobotMonth();
      });
      // CC have different procedures
      if (!/CC/.test(user.role)) {
        it('(Excluding CC) I Me Input company, worksite, robot and month but do not select any report, verify "Download Report" button is disabled and correct empty PDF frame', () => {
          cleaningJobs.noDownloadCleaningJobReportWithCompanyWorksiteRobotMonth(user.role);
        });
        it('(Excluding CC) Input company, worksite, robot and month, download the first report, verify successful api call and file download', () => {
          cleaningJobs.downloadCleaningJobReportWithCompanyWorksiteRobotMonth(user.role);
        });
      }
      context('user', user.role, () => {
        beforeEach(() => {
          // CC have different view
          cleaningJobs.cleaningJobsBeforeEach(baseURL, user.username, user.password, user.role);
        });
        it('32131', () => {
          cleaningJobs.downloadCleaningJobReportWithCompanyWorksiteRobotMonth(user.role);
        });
        context('use213123r', user.role, () => {
          beforeEach(() => {
            // CC have different view
            cleaningJobs.cleaningJobsBeforeEach(baseURL, user.username, user.password, user.role);
          });
          it('5434634', () => {
            cleaningJobs.downloadCleaningJobReportWithCompanyWorksiteRobotMonth(user.role);
          });
        });
      });
    });
  });
});
