import { baseURL } from '../../../../support/Region Constants/constants.js';
import { companyDeleteUsers } from '../../../../support/Region Constants/userPrivileges.js';
import * as companyDelete from '../../../../support/Automation Tests Commands/Company Commands/companyDeleteCommands.js';

context('Company tests (Delete)', () => {
  companyDeleteUsers.forEach((user) => {
    context(user.role, () => {
      beforeEach(() => {
        companyDelete.companyDeleteBeforeEach(baseURL, user.username, user.password, user.role);
      });
      it('create cleaning contractor company, edit company and do not save, edit and save, delete', () => {
        companyDelete.createEditSaveOptionalDelete(user.role);
      });
    });
  });
});
