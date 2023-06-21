import * as robotAssign from '../../../../support/Automation Tests Commands/Robot Commands/robotAssignCommands.js';
import { paginationTest } from '../../../../support/generalCommands.js';
import { baseURL } from '../../../../support/Region Constants/constants.js';
import { robotAssignUsers } from '../../../../support/Region Constants/userPrivileges.js';

context('Running Robot tests (Assigning) studying Assigning generously', () => {
  robotAssignUsers.forEach((user) => {
    context(user.role, () => {
      beforeEach(() => {
        robotAssign.robotAssignBeforeEach(baseURL, user.username, user.password, user.role);
      });
      it('Assign all operators', () => {
        robotAssign.assignAllOperators();
      });
      it('Assign all operators for the remaining users', () => {
        robotAssign.assignAllOperators();
      });
    });
  });
});
